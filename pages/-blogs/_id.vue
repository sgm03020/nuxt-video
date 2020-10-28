<template>
  <section>
    <!-- <div>company: {{ this.company }}</div> -->
    <div>
      <div>{{ $route.params }}</div>
    </div>
    <v-container v-if="$route.params.id && $route.params.id !== ''">
      <!-- <v-container v-if="0"> -->
      <v-row>
        <v-btn
          v-on:click="$router.push({ path: $route.path, query: {} })"
          rounded
          class="indigo darken-3 mx-2 my-2"
        >
          戻る
        </v-btn>
      </v-row>
      <!-- <span>{{ $route.query.id }}</span> -->
      <v-row>
        <span>
          <v-card-title class="subtitle-1">{{
            selectedBlog.title
          }}</v-card-title>
        </span>
      </v-row>
      <v-row>
        <!-- {{ selectedBlog }} -->
        <v-card class="mx-auto">
          <v-img
            class=""
            contain
            :src="selectedBlog.heroImage.url + '?fm=jpg&fl=progressive'"
          ></v-img>
          <v-card-subtitle class="text-center mt-1 pa-0">{{
            selectedBlog.heroImage.title
          }}</v-card-subtitle>
          <v-spacer></v-spacer>
          <!-- <v-card-text class="mx-1 my-2">{{ selectedBlog.body }}</v-card-text> -->
          <div class="mx-1 my-2" v-html="$md.render(selectedBlog.body)"></div>
        </v-card>
      </v-row>
    </v-container>
    <v-container v-else>
      <!-- {{ $route.params }} -->
      <p>
        <v-btn
          v-on:click="company = ''"
          rounded
          class="indigo darken-3 mx-2 my-2"
        >
          全て
        </v-btn>
        <v-btn
          v-for="(item, index) in blog_persons_array"
          v-on:click="company = item.company"
          rounded
          class="indigo darken-3 mx-2 my-2"
          :key="index"
        >
          {{ item.company }}
        </v-btn>
      </p>
      <div class="videos">
        　<transition-group tag="ul" class="videos__list">
          <li
            class="videos__item"
            v-for="(card, index) in filteredList.list"
            :data-index="index"
            :key="card.sys.id"
          >
            <v-card class="pb-2">
              <!-- <v-img
              contain
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            ></v-img> -->
              <v-img
                contain
                :src="card.heroImage.url + '?fm=jpg&fl=progressive'"
              ></v-img>
              <v-card-title class="subtitle-1 pl-2 pb-1 mb-2">
                {{ card.title }}
                <v-btn
                  v-show="1"
                  color="orange lighten-2"
                  text
                  @click="selected(card.slug)"
                >
                  SELECT
                </v-btn>
              </v-card-title>
              <!-- <v-card-subtitle class="">
                {{ card.description }}
              </v-card-subtitle> -->
              <!-- <div v-if="card.category !== null">
                  <span v-if="card.category['genre'] !== null">
                    <v-avatar
                      :key="'ava' + card.sys.id"
                      :v-for="item in card.category['genre']"
                      v-if="item !== null"
                    >
                      {{ item }}
                    </v-avatar>
                  </span>
                </div> -->

              <!-- {{ card.category }} -->
              <div class="ma-1" v-if="card.category">
                <div v-if="card.category['genre']">
                  <!-- {{ card.category['genre'] }} -->
                  <v-chip
                    class="mx-2 my-0"
                    rounded
                    color="indigo"
                    v-for="(el, index) in card.category['genre']"
                    :key="index"
                  >
                    <span class="caption">{{ el }}</span>
                  </v-chip>
                </div>
              </div>

              <v-card-actions v-if="0" :key="card.sys.id">
                <!-- <v-btn color="orange lighten-2" text> Explore </v-btn> -->
                <!-- <span class="ml-1 py-1 grey--text subtitle-2">
                    {{ card.body.substring(0,15) + '...'}}
                </span> -->
                <v-spacer></v-spacer>
                <!-- 1) v-btnにはキーを与えないと、複数のcardが反応する -->
                <!-- 2) show配列はshow[index]=trueとやっても反応しないspliceを使って入れ替える -->
                <!-- {{index}}-{{show[index]}}<br /> -->
                <v-btn icon @click="show.splice(index, 1, !show[index])">
                  <v-icon>{{
                    show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="show[index]">
                  <v-divider></v-divider>
                  <v-card-text v-html="$md.render(card.body)">
                    <!-- {{ card.body }} -->
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </li>
        </transition-group>
      </div>
    </v-container>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import {
  GetPersonCollection,
  GetBlogPostCollection,
} from '../../queries/blog.gql'

export default {
  components: {
    // watchQuery: ['id'],
  },
  data: () => ({
    slug: '',
  }),
  async asyncData({ error, app, params, route, store, query }) {
    // console.log('params', params.id)
    //console.log('route', route)

    try {
      // id としないと取れない(slugとかはダメだった)
      // const id = await route.query.id
      const { id } = params
      console.log('asyncData id: ', id)

      const getperson = await app.$hasura({
        query: print(GetPersonCollection),
      })

      const getblog = await app.$hasura({
        query: print(GetBlogPostCollection),
      })
      const blogs = getblog.data.blogPostCollection.items
      const persons = getperson.data.personCollection.items
      // console.log('blogs: ', blogs)

      let findBlog = undefined
      if (id) {
        findBlog = blogs.find((el) => el.slug === id)
        if (!findBlog) {
          error({ statusCode: 404, message: 'Not Found Blog Contents' })
        }
      }
      // console.log('id findBlog: ', id, findBlog)

      // 記事の総数
      const items_size = blogs.length

      return {
        // id: id,
        show: Array(items_size).fill(false),
        company: '',
        blog_persons_array: persons,
        blog_contents_array: blogs,
        // selectedBlog: findBlog ? findBlog : undefined,
      }
    } catch (err) {
      console.log('asyncData err:', err)
      return {
        // id: id,
        show: [],
        company: '',
        blog_persons_array: [],
        blog_contents_array: [],
        // selectedBlog: undefined,
      }
    }
  },
  computed: {
    filteredList() {
      const selectedList = this.blog_contents_array.filter(
        (el) => this.company === '' || el.author.company === `${this.company}`
      )
      const selected_size = selectedList.length
      // console.log('selected_size: ', selected_size)
      const selectedShowList = Array(selected_size).fill(false)
      // 配列更新時には一旦spliceで全部消してから
      this.show.splice(0, this.show.length)
      this.show = selectedShowList
      return {
        list: selectedList,
      }
    },
    selectedBlog() {
      // this.$vuetify.theme.dark = false
      if (this.slug && this.slug != '') {
        return this.blog_contents_array.find((el) => el.slug === `${this.slug}`)
      } else {
        return null
      }
    },
  },
  methods: {
    async selected(slug) {
      console.log('slug:', slug)
      // ここでpushしてもダメ
      // this.$router.push('/')
      // this.$router.push('/blogs/hello-world')
      // this.$router.push({ path: '/blogs', params: { id: 'hello-world' } })
      // this.$router.push({ name: "/blogs" , params: {id : 'hello-world'}}).catch(() => {});
      // routeを変えるのは諦めて
      // dataでやる
      this.slug = slug
      //this.$router.push({ path: "blogs" , params: {id : 'hello-world'}}).catch(() => {})
      //this.$router.push(`${slug}`).catch(() => {})
      await this.$router.push({ path: `${slug}` })
    },
  },
}
</script>

<style lang="scss" scoped>
$gap: 20px;
p {
  text-align: center;
}
.videos {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-left: 0;
    margin: {
      top: 0;
      bottom: 0;
    }
    list-style: none;
    /** ↑の行でlintエラーとなるためstylelint.config.jsへルール追加 */
  }

  &__item {
    width: calc(50% - #{$gap / 2});

    &:nth-child(n + 3) {
      margin-top: $gap;
    }
  }
}

/* トランジション用スタイル */
.v-enter-active,
.v-leave-active,
.v-move {
  transition: opacity 1s, transform 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
