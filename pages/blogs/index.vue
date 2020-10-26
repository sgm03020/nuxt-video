<template>
  <section>
    <!-- <div>company: {{ this.company }}</div> -->
    <v-container v-if="$route.query.id && $route.query.id !== ''">
      <v-btn
        v-on:click="$router.push({ path: $route.path, query: {} })"
        rounded
        class="indigo darken-3 mx-2 my-2"
      >
        戻る
      </v-btn>
      <!-- <span>{{ $route.query.id }}</span> -->
      <span>
        <v-card-title class="subtitle-1">{{ selectedBlog.title }}</v-card-title>
      </span>
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
        <v-card-text class="mx-1 my-2">{{ selectedBlog.body }}</v-card-text>
      </v-card>
    </v-container>
    <v-container v-else>
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
            <v-card>
              <!-- <v-img
              contain
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            ></v-img> -->
              <v-img
                contain
                :src="card.heroImage.url + '?fm=jpg&fl=progressive'"
              ></v-img>
              <v-card-title class="">
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
              <v-card-subtitle class="">
                {{ card.description }}
              </v-card-subtitle>
              <v-card-actions :key="card.sys.id">
                <!-- <v-btn color="orange lighten-2" text> Explore </v-btn> -->
                <span class="ml-4 grey--text subtitle-2">本文...</span>
                <v-spacer></v-spacer>
                <!-- 1) v-btnにはキーを与えないと、複数のcardが反応する -->
                <!-- 2) show配列はshow[index]=trueとやっても反応しないspliceを使って入れ替える -->
                <v-btn icon @click="show.splice(index, 1, !show[index])">
                  <!-- {{index}}-{{show[index]}}<br /> -->
                  <v-icon>{{
                    show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="show[index]">
                  <v-divider></v-divider>
                  <v-card-text>
                    {{ card.body }}
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
  components: {},
  async asyncData({ error, redirect, app, params, route, store }) {
    //console.log('params', params)
    //console.log('route', route)

    // id としないと取れない(slugとかはダメだった)
    const id = route.query.id || ''
    // console.log('id: ', id)

    const getperson = await app.$hasura({
      query: print(GetPersonCollection),
    })

    const getblog = await app.$hasura({
      query: print(GetBlogPostCollection),
    })

    if (id !== '') {
      const findBlog = getblog.data.blogPostCollection.items.find((el) => {
        return el.slug === id
      })
      if (!findBlog) {
        error({ statusCode: 404, message: 'Not Found Blog Contents' })
      }
    }

    // 記事の総数
    const items_size = getblog.data.blogPostCollection.items.length

    return {
      show: Array(items_size).fill(false),
      company: '',
      blog_persons_array: getperson.data.personCollection.items,
      blog_contents_array: getblog.data.blogPostCollection.items,
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
      return this.blog_contents_array.find(
        (el) => el.slug === `${this.$route.query.id}`
      )
    },
  },
  methods: {
    selected(slug) {
      this.$router.push({ path: this.$route.path, query: { id: slug } })
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

