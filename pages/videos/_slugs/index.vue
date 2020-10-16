<template>
  <div v-if="!notfound">
    <!-- <h2>{{ this.slug }}</h2> -->
    <h2>{{ page_name }}</h2>
    <v-container fluid>
      <!-- <h1>Gallery</h1> -->
      <!-- <h2>おすすめの動画</h2> -->
      <v-row dense>
        <v-col
          v-for="(card, index) in video_contents_array"
          :key="index"
          :cols="card.flex"
        >
          <v-card>
            <!-- <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          > -->
            <LazyYoutubeVideo
              :src="card.src"
              :preview-image-size="card.previewImageSize"
              :aspect-ratio="card.aspectRatio"
              :thumbnail-listeners="{ load: () => {} }"
            />

            <!-- <v-card-title v-text="card.title"></v-card-title> -->
            <v-card-subtitle
              class="text-center ma-2 pa-0"
              v-text="card.title"
            ></v-card-subtitle>
            <!-- </v-img> -->
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-2 justify-space-between">
        <!-- <v-spacer /> -->
        <v-btn color="primary" nuxt to="/"> 最初のページ </v-btn>
        <!-- <v-btn color="primary" nuxt to="/upper">上半身</v-btn> -->
        <v-btn color="primary" nuxt :to="{ path: `${next_route}` }">{{
          next_page_name
        }}</v-btn>
      </v-row>
    </v-container>
  </div>
  <div v-else>Not Found</div>
</template>

<script>
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
const basePath = '/videos'

// Hasura QUERY
// 基本の4つ取りクエリ
const QUERY = gql`
  query {
    video_contents_master(limit: 4, order_by: { id: asc }) {
      id
      contents_id
      url
      src
      title
      tmb
      previewsize
    }
  }
`

// カテゴリ選択動画
const GET_VIDEO_CONTENTS = gql`
  query GetVideoContents($category: String!) {
    video_contents_master(
      where: { category: { _eq: $category } }
      limit: 8
      order_by: { id: desc }
    ) {
      id
      contents_id
      url
      src
      title
      tmb
      previewsize
    }
  }
`

// ページ名によるコンテンツ
const GET_VIDEO_PAGES = gql`
  query GetVideoPages {
    video_pages(where: { enabled: { _eq: "1" } }, order_by: { page_id: asc }) {
      page_id
      page_tag
      page_name
      base_path
      full_path
    }
  }
`

// category_idによるコンテンツ
const GET_VIDEO_BY_CAT = gql`
  query GetVideoByCat($category_id: String!) {
    video_contents_master(where: { category_id: { _eq: $category_id } }) {
      title
      url
      src
      tmb
      previewsize
      flex
    }
  }
`

// ページ名によるコンテンツ
const GET_VIDEO_BY_PAGE = gql`
  query GetVideoByPage($page_tag: String!) {
    video_pages(where: { page_tag: { _eq: $page_tag } }) {
      page_id
      page_name
      base_path
      full_path
      video_contents_master {
        title
        url
        src
        tmb
        previewsize
        flex
      }
    }
  }
`

export default {
  components: {
    LazyYoutubeVideo,
  },
  async asyncData({ error, redirect, app, params, route }) {
    /* わざとエラーにする場合に使う
    return app.$axios
      .get(`http://mysiteabcd.com/articles`)
      .then((res) => {
        return { error: false }
      })
      .catch((err) => {
        error({ statusCode: 404, message: err.message })
      })
    */
    if (params == undefined) {
      console.log('params is undefined.')
      error({ statusCode: 404, message: 'Error Not Found' })
    }
    console.log('params=', params)
    //console.log('route params=', route.params)

    const slugs = await params.slugs // When calling /abc the slug will be "abc"
    // TODO 現在ハードコーディング
    if (['upper', 'lower', 'stretch', 'topics'].indexOf(slugs) < 0) {
      error({ statusCode: 404, message: 'Error Not Found' })
    }

    try {
      console.log('start')
      const GetVideoPages = await app.$hasura({
        query: print(GET_VIDEO_PAGES),
      })
      const pages = GetVideoPages.data.video_pages
      // console.log('pages: ', pages)
      // タグ名から配列のインデックスを取得
      const cat_index = pages.findIndex((v) => v.page_tag == slugs)
      const currentPage = pages[cat_index]
      const page_id = currentPage.page_id
      const page_name = currentPage.page_name
      let video_contents_array = undefined
      // For next
      const nextPage = pages[(cat_index + 1) % pages.length]
      const next_route = nextPage.full_path
      const next_page_name = nextPage.page_name

      const { data } = await app.$hasura({
        query: print(GET_VIDEO_BY_CAT),
        variables: {
          category_id: `${page_id}`,
        },
      })
      // console.log('data: ', data)
      if (data) {
        video_contents_array = data.video_contents_master
        // console.log('video_contents_array: ', video_contents_array);
      }
      // return {}

      /* OK パターン1
      const { data } = await app.$hasura({
        query: print(GET_VIDEO_BY_PAGE),
        variables: {
          page_tag: `${slugs}`,
        },
      })
      */

      // オブジェクトアクセスでとりあえず['0']決め打ちにしておく
      // 次のページ先を算出
      // TODO 以下の配列はhasuraから取得する
      // const pageNameArray = [
      //   { topics: 'トピックス' },
      //   { upper: '上半身' },
      //   { lower: '下半身' },
      //   { stretch: 'ストレッチ他' },
      // ]
      //console.log('data.video_pages: ', data.video_pages);
      //console.log('data.video_pages: ', data.video_pages[0]);

      /*
      if (data.video_pages['0'].page_name) {
        const pagename = data.video_pages['0'].page_name
        console.log('pagename: ', pagename);
        // 
        let findIndex = -1
        for (el in pagesNameArray) {
          if (el['page_tag'] == slugs){
            findIndex = index
            break
          }
        }

        // console.log('pagenum: ', findIndex)
        if (findIndex >= 0) {
          const pageindex = (findIndex + 1) % pagesNameArray.length
          // next path = /videos/next
          //const nextroute = basePath + '/' + Object.keys(pageNameArray[pageindex])[0]
          const nextroute = basePath + '/' + (pagesNameArray[pageindex])['page_tag']
          //const nextpagename = Object.values(pageNameArray[pageindex])[0]
          const nextpagename = (pageNameArray[pageindex])['page_name']
          console.log(nextroute)
          return {
            notfound: false,
            slugs,
            page_name: pagename,
            next_route: nextroute,
            next_page_name: nextpagename,
            video_contents_array: data.video_pages['0'].video_contents_master, //data.video_contents_master,
          }
        }
      }
      */
      //

      return {
        notfound: false,
        slugs,
        page_name,
        next_route,
        next_page_name,
        video_contents_array,
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Server Error' })
      //error({ statusCode: 404, message: err.message })
    }

    // return {
    //   notfound: false,
    //   slug: data.video_pages['0'].page_name,
    //   page_name: data.video_pages['0'].page_name,
    //   video_contents_array: data.video_pages['0'].video_contents_master, //data.video_contents_master,
    // }
  },
  data: () => ({
    page_name: '',
    page_index: 0,
    next_route: '',
    page_array: ['topics', 'upper', 'lower', 'stretch'],
    video_contents_array: [],
  }),
  mounted() {
    // ページ順(ここでは取得しないこちらはクライアント側)
    //console.log('page_name=', this.page_name)
  },
}
</script>
