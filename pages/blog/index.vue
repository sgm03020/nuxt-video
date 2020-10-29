<template>
  <div>
    <div v-if="false">
      <div>query:{{ $route.query }}</div>
      <div>params:{{ $route.params }}</div>
      <div>selected:{{ selectedIndex }}</div>
      <div>getQuery:{{ getQuery }}</div>
      <div>getIndex:{{ getIndex }}</div>
      <div>company:{{ company }}</div>
      <div>this.company:{{ this.company }}</div>
    </div>

    <div v-if="false">
      <v-btn @click="() => this.$router.push(`?id=hello-world`)">
        Hello World
      </v-btn>
      <router-link
        v-for="el in blogs"
        :to="'/blog?id=' + el.slug"
        tag="a"
        :key="el.slug"
      >
        {{ el.slug }}
      </router-link>
    </div>

    <!-- OK パターン1 -->
    <div v-if="false">
      <v-btn
        v-for="(el, i) in blogs"
        @click="() => $router.push(`?id=${el.slug}`)"
        :key="el.sys.id"
      >
        SELECT({{ i }})
      </v-btn>
    </div>

    <!-- OK パターン2 Good -->
    <div v-if="false">
      <v-btn v-for="(el, i) in blogs" :to="'?id=' + el.slug" :key="el.sys.id">
        SELECT({{ i }})
      </v-btn>
      <v-btn to="/blog"> ALL </v-btn>
    </div>

    <div v-if="false">
      <v-btn @click="() => (selectedIndex = -1) && this.$router.push('')">
        ALL
      </v-btn>
    </div>

    <v-btn
      v-if="false"
      @click="() => $router.push({ path: 'hoge', query: { xyz: 123 } })"
    >
      hoge
    </v-btn>

    <div v-show="this.getIndex !== -1">
      <v-btn
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        rounded
        class="primary mx-2 my-2"
      >
        色変更
      </v-btn>
      <v-btn to="/blog" rounded class="primary mx-2 my-2"> 戻る </v-btn>
    </div>

    <div v-show="this.getIndex === -1">
      <v-btn
        v-on:click="company = ''"
        rounded
        class="primary mx-2 my-2"
      >
        全て
      </v-btn>
      <v-btn
        v-for="(item, index) in this.persons"
        v-on:click="company = item.company"
        rounded
        class="primary mx-2 my-2"
        :key="index"
      >
        {{ item.company }}
      </v-btn>
    </div>
    <!-- <div v-show="selectedBlog">selectBlog:{{ selectedBlog }}</div> -->
    <!-- OK パターン <v-container v-show="getQuery['id'] !== -1" key="1"> -->
    <transition-group>
      <v-container v-if="this.getIndex !== -1" key="1">
        <!-- <div>{{ blogs[this.getIndex] }}</div> -->
        <span>
          <v-card-title class="subtitle-1">{{
            blogs[this.getIndex].title
          }}</v-card-title>
        </span>
        <!-- {{ selectedBlog }} -->
        <v-card class="mx-auto">
          <v-img
            class=""
            contain
            :src="blogs[this.getIndex].heroImage.url + '?fm=jpg&fl=progressive'"
          ></v-img>
          <v-card-subtitle class="text-center mt-1 pa-0">{{
            blogs[this.getIndex].heroImage.title
          }}</v-card-subtitle>
          <v-spacer></v-spacer>
          <!-- <v-card-text class="mx-1 my-2">{{
            blogs[this.getIndex].body
          }}</v-card-text> -->
          <div
            class="mx-1 my-2 px-2 py-2"
            v-html="$md.render(blogs[this.getIndex].body)"
          ></div>
        </v-card>
      </v-container>
      <v-container v-else key="0">
        <!-- <transition-group> -->
        <!-- <div v-for="el in this.blogs" :key="el.slug"> -->
        <div class="videos">
          　<transition-group tag="ul" class="videos__list">
            <li
              class="videos__item"
              v-for="(card, index) in filteredBlog"
              :data-index="index"
              :key="card.slug"
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
                    :to="'/blog?id=' + card.slug"
                  >
                    SELECT
                  </v-btn>
                </v-card-title>
                <div class="ma-1" v-if="card.category">
                  <div v-if="card.category['genre']">
                    <!-- {{ card.category['genre'] }} -->
                    <!-- color="blue-grey darken-2" -->
                    <v-chip
                      class="mx-2 mt-1"
                      rounded
                      color="secondary"
                      v-for="(el, index) in card.category['genre']"
                      :key="index"
                    >
                      <span class="caption">{{ el }}</span>
                    </v-chip>
                  </div>
                </div>
              </v-card>
            </li>
          </transition-group>
        </div>
        <!-- {{ el.title }} -->
        <!-- </div> -->
        <!-- </transition-group> -->
      </v-container>
    </transition-group>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import {
  GetPersonCollection,
  GetBlogPostCollection,
} from '../../queries/blog.gql'

export default {
  // watchQuery: ['id'],
  data: () => ({
    company: '',
  }),
  async asyncData({ app, route, query }) {
    console.log('route', route)
    try {
      // id としないと取れない(slugとかはダメだった)
      // const id = await route.query.id
      const { id } = query
      console.log('asyncData id: ', id)

      const getperson = await app.$hasura({
        query: print(GetPersonCollection),
      })

      const getblog = await app.$hasura({
        query: print(GetBlogPostCollection),
      })
      const blogs = await getblog.data.blogPostCollection.items
      const persons = await getperson.data.personCollection.items
      // console.log('blogs: ', blogs)

      let findIndex = -1
      if (id) {
        findIndex = blogs.findIndex((el) => el.slug === id)
        if (findIndex !== -1) {
          error({ statusCode: 404, message: 'Not Found Blog Contents' })
        }
      }
      console.log('id findIndex: ', id, findIndex)

      // 記事の総数
      const items_size = blogs.length

      return {
        selectedIndex: findIndex,
        show: Array(items_size).fill(false),
        company: '',
        persons: persons,
        blogs: blogs,
      }
    } catch (err) {
      console.log('asyncData err:', err)
      return {
        selectedIndex: -1,
        show: [],
        company: '',
        persons: [],
        blogs: [],
      }
    }
  },
  computed: {
    setTheme() {
      if (this.goDark === true) {
        return (this.$vuetify.theme.dark = true)
      } else {
        return (this.$vuetify.theme.dark = false)
      }
    },
    filteredBlog() {
      if (this.company === '') {
        return this.blogs
      } else if (this.company !== '') {
        return this.blogs.filter((el) => el.author.company === this.company)
      }
    },
    selectedBlog() {
      const query_id = this.$route.query.id
      console.log('query_id: ', query_id)
      // console.log('this.blogs[0].title: ', this.blogs[0].title);
      // const selectblog = this.blogs.find((el) => el.slug === `${this.slug}`)
      const selectblog = this.blogs.find((el) => el.slug === query_id)
      // console.log('selectblog: ', selectblog);

      if (selectblog) {
        return selectblog
      } else {
        return undefined
      }
    },
    getQuery() {
      // console.log(this.$route)
      return this.$route.query
    },
    getIndex() {
      const { id } = this.$route.query
      console.log('getIndex $route.query.id: ', id)
      const find = this.blogs.findIndex((el) => el.slug === id)
      if (find >= 0) {
        this.selectedIndex = find
        return find
      } else return -1
    },
  },
  methods: {
    select(index) {},
  },
}
</script>

<style lang="scss" scoped>
$gap: 10px;
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
