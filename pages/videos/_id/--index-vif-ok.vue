<template>
  <div>
    <div>{{ this.$route.query.id }}</div>
    <transition-group>
      <v-container v-if="this.getIndex !== -1" key="0">
        <div><v-card-text>container-0</v-card-text></div>
        <v-btn
          @click="$router.push({ name: '', query: {} })"
          rounded
          class="primary mx-2 my-2"
          >PUSH</v-btn
        >
      </v-container>
      <v-container v-else key="1" class="ma-0 pa-0">
        <!-- <div><v-card-text>container-1</v-card-text></div> -->
        <!-- <v-btn @click="$router.go(-1)">BACK</v-btn> -->
      </v-container>
      <v-container v-show="this.getIndex === -1" key="2">
        <div><v-card-text>container-2</v-card-text></div>
        <v-btn @click="$router.go(-1)">BACK</v-btn>
      </v-container>
    </transition-group>
  </div>
</template>

<script>
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import { GetVideoByCat, GetVideoPages } from '../../../queries/index.gql'
const basePath = '/videos'

export default {
  components: {
    LazyYoutubeVideo,
  },
  async asyncData({ error, redirect, app, params, route, store }) {
    /* わざとエラーにする場合に使う
      error({ statusCode: 404, message: err.message })
    */
    if (params == undefined) {
      console.log('params is undefined.')
      error({ statusCode: 404, message: 'Error Not Found' })
    }

    const id = await params.id // When calling /abc the slug will be "abc"
    // TODO 現在ハードコーディング
    // if (['upper', 'lower', 'stretch', 'topics'].indexOf(slugs) < 0) {
    //   error({ statusCode: 404, message: 'Error Not Found' })
    // }

    try {
      // console.log('start')
      // const GetVideoPages = await app.$hasura({
      //   query: print(GET_VIDEO_PAGES),
      // })
      // ここは、GetVideoPagesと違う名前にしないと取得できない
      // しかし、{data}は下で使うので別名にする
      const response_pages = await app.$hasura({
        query: print(GetVideoPages),
      })

      const pages = response_pages.data.video_pages
      // タグ名から配列のインデックスを取得
      const cat_index = pages.findIndex((v) => v.page_tag == id)
      const currentPage = pages[cat_index]
      const page_id = currentPage.page_id
      const page_name = currentPage.page_name
      let video_contents_array = []
      // For next
      const nextPage = pages[(cat_index + 1) % pages.length]
      const next_route = nextPage.full_path
      const next_page_name = nextPage.page_name

      const { data } = await app.$hasura({
        query: print(GetVideoByCat),
        variables: {
          category_id: `${page_id}`,
        },
      })
      // console.log('data: ', data)
      if (data) {
        video_contents_array = data.video_contents_master
      }

      /* OK パターン1
      const { data } = await app.$hasura({
        query: print(GET_VIDEO_BY_PAGE),
        variables: {
          page_tag: `${slugs}`,
        },
      })
      */
      return {
        notfound: false,
        id,
        page_id,
        page_name,
        next_route,
        next_page_name,
        video_contents_array,
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Server Error' })
      //error({ statusCode: 404, message: err.message })
    }
  },
  data: () => ({
    page_name: '',
    page_index: 0,
    next_route: '',
    page_array: ['topics', 'upper', 'lower', 'stretch'],
    video_contents_array: [],
    selectedIndex: -1,
  }),
  computed: {
    getIndex() {
      const { id } = this.$route.query
      // console.log('getIndex $route.query.id: ', id)
      const find = this.video_contents_array.findIndex(
        (el) => el.contents_id === id
      )
      if (find >= 0) {
        this.selectedIndex = find
        return find
      } else return -1
    },
    // classObject(index, flex) {
    // return { paddright10: (index % 2 === 0 && flex < 7) }
    // if (index % 2 === 0 && flex < 7) {
    //   return { paddright10: true }
    // }
    // else return { paddright10: false }
    // return { paddright10: false }
    // },
    classObject() {
      return { paddright10: false }
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

  // transform: translateY(-20px);
  transform: translateX(-50px);
}
.v-leave-to {
  opacity: 0;

  // transform: translateY(20px);
  transform: translateX(50px);
}

.mginleft {
  margin-left: 4px;
}
.mginright {
  margin-right: 4px;
}

.paddleft {
  padding-left: 4px;
}
.paddright {
  padding-right: 4px;
}
</style>