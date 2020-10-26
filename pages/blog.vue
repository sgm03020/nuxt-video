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
        v-on:click="
          company = ''
          selected_id = ''
          selected_slug = ''
        "
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

    <div v-if="selected_id !== ''">
      <!-- {{ selectedBlog }} -->
      <v-card class="ma-1">
        <v-card-title class="subtitle-1">{{ selectedBlog.title }}</v-card-title>
        <v-img
          contain
          :src="selectedBlog.heroImage.url + '?fm=jpg&fl=progressive'"
        ></v-img>
        <v-spacer></v-spacer>
        <v-card-text class="mx-1 my-2">{{ selectedBlog.body }}</v-card-text>
      </v-card>
    </div>
    <div v-else class="videos">
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
          <!-- height="250" -->

          <!-- <v-card>
            <v-img contain :src="card.heroImage.url + '?fm=jpg&fl=progressive'"></v-img>
            <v-card-text>
              {{ card.heroImage.title }}
            </v-card-text>
            <v-card-text>{{ card.body.substring(0, 24) || '' }}...</v-card-text>
          </v-card> -->
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
                @click="
                  selected_id = card.sys.id
                  selected_slug = card.slug
                "
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
                  <!-- I'm a thing. But, like most politicians, he promised more than
                he could deliver. You won't have time for sleeping, soldier, not
                with all the bed making you'll be doing. Then we'll go with that
                data file! Hey, you add a one and two zeros to that or we walk!
                You're going to do his laundry? I've got to find a way to
                escape. -->
                  {{ card.body }}
                </v-card-text>
              </div>
            </v-expand-transition>
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

      console.log('params:', params)
      console.log('route:', route)

      const getperson = await app.$hasura({
        query: print(GetPersonCollection),
      })

      const getblog = await app.$hasura({
        query: print(GetBlogPostCollection),
      })

      const items_size = getblog.data.blogPostCollection.items.length
      //const array = Array(items_size).fill(false)
      //console.log(getblog.data.blogPostCollection.items)
      return {
        show: Array(items_size).fill(false),
        selected_id: '',
        selected_slug: '',
        author_email: '',
        company: '',
        blog_persons_array: getperson.data.personCollection.items,
        blog_contents_array: getblog.data.blogPostCollection.items,
      }
    } catch (err) {
      console.log(err)
      return {
        show: [],
        selected_id: '',
        selected_slug: '',
        author_email: '',
        company: '',
        blog_persons_array: [],
        blog_contents_array: [],
      }
    }
  },
  data: () => ({
    show: [],
    selected_id: '',
    selected_slug: '',
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
    // これではparamsは取れなかった
    // selectedBlog: function ({ params }) {
    //   self = this
    //   console.log(self.context)
    //   return this.blog_contents_array.find(
    //     (el) => el.sys.id === `${this.selected_id}`
    //   )
    // },
    selectedBlog() {
      // 無理やりurlにパラメータを付ける(contextからは無理だった)
      //this.$router.push({path: this.$route.path, query: { id: 'bar' }})
      console.log('this.$route.query : ', this.$route.query );
      if (this.$route.query) {

      }

    //   this.$router.push({
    //     path: this.$route.path,
    //     query: { id: this.selected_slug },
    //   })
    //   //console.log(this.$route.query)
    //   //console.log(this.$nuxt.context)
    //   return this.blog_contents_array.find(
    //     (el) => el.sys.id === `${this.selected_id}`
    //   )
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

