<template>
  <div>
    <h2>Transitions Page</h2>
    <v-container v-if="0" fluid>
      <v-row dense>
        <v-col
          v-for="(card, index) in video_contents_array"
          :key="index"
          :cols="card.flex"
        >
          <v-card>
            <v-card-subtitle class="text-center ma-2 pa-0" v-text="card.title">
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-2 justify-space-between">
        <v-btn color="primary" nuxt to="/"> 最初のページ </v-btn>
        <v-btn color="primary" nuxt :to="{ path: `${next_route}` }">{{
          next_page_name
        }}</v-btn>
      </v-row>
    </v-container>
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
      <!-- <v-btn @click="category_id = 0">0</v-btn>
      <v-btn @click="current = 1">1</v-btn>
      <v-btn @click="current = 2">2</v-btn>
      <v-btn @click="category_id = 1003">1003</v-btn> -->
    </p>

    <!-- v-for="(card, index) in filteredList" -->
    <div class="videos">
      　<transition-group tag="ul" class="videos__list">
        <li
          class="videos__item"
          v-for="(card, index) in filteredList.list"
          :data-index="index"
          :key="card.sys.id"
        >
          <!-- {{card.id}} -->
          <!-- <LazyYoutubeVideo src="https://www.youtube.com/embed/4JS70KB9GS0" /> -->
          <!-- <LazyYoutubeVideo :src="card.src" /> -->
          <!-- src="https://cdn.vuetifyjs.com/images/cards/cooking.png" -->
          <!-- <v-img height="250" :src="card.heroImage.url + '?fm=jpg&fl=progressive'"></v-img> -->
          <!-- <v-img height="250" :src="card.heroImage.url"></v-img> -->
          <v-card>
            <v-img
              height="250"
              :src="card.heroImage.url + '?fm=jpg&fl=progressive'"
            ></v-img>
            <v-card-text>
              {{ card.heroImage.title }}
            </v-card-text>
            <!-- <v-card-subtitle>
              <div class="my-2 subtitle-1">{{ card.title }}</div>
            </v-card-subtitle> -->
            <!-- <v-card-text>
              <div>
                Small plates, salads & sandwiches - an intimate setting with 12
                indoor seats plus patio seating.
              </div>
            </v-card-text> -->
            <!-- <v-divider class="mx-4"></v-divider> -->
            <!-- <v-card-title>Tonight's availability</v-card-title> -->
            <v-card-text>{{ card.body.substring(0, 24) || '' }}...</v-card-text>
          </v-card>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import { GetPersonCollection, GetBlogPostCollection } from '../queries/blog.gql'
const basePath = '/videos'

const QUERY = gql`
  query {
    blogPostCollection {
      items {
        title
      }
    }
  }
`

export default {
  components: {
    LazyYoutubeVideo,
  },
  //   props: {
  //     company: {
  //       type: String,
  //       required: false,
  //     },
  //   },
  async asyncData({ error, redirect, app, params, route, store }) {
    try {
      const getperson = await app.$hasura({
        query: print(GetPersonCollection),
      })

      const getblog = await app.$hasura({
        query: print(GetBlogPostCollection),
      })
      //console.log(getblog.data.blogPostCollection.items)
      return {
        author_email: '',
        company: '',
        blog_persons_array: getperson.data.personCollection.items,
        blog_contents_array: getblog.data.blogPostCollection.items,
      }
    } catch (err) {
      console.log(err)
      return {
        author_email: '',
        company: '',
        blog_persons_array: [],
        blog_contents_array: [],
      }
    }
  },
  data: () => ({
    company: '',
    blog_contents_array: [],
    // list: [],
  }),
  computed: {
    filteredList() {
      // const pages = this.$store.state.pages
      return {
        // pages,
        // company: this.company,
        list: this.blog_contents_array.filter(
          (el) => this.company === '' || el.author.company === `${this.company}`
        ),
      }
    },
  },
  mounted() {
    // ページ順(ここでは取得しないこちらはクライアント側)
    //console.log('page_name=', this.page_name)
    //store.state.pages
    //console.log('store.state.pages: ', store.state.pages);
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

