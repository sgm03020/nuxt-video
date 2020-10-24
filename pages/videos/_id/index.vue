<template>
  <div v-if="!notfound">
    <h2>{{ page_name }}</h2>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(card, index) in video_contents_array"
          :key="index"
          :cols="card.flex"
        >
          <v-card>
            <LazyYoutubeVideo
              :src="card.src"
              :preview-image-size="card.previewImageSize"
              :aspect-ratio="card.aspectRatio"
              :thumbnail-listeners="{ load: () => {} }"
            />
            <v-card-subtitle
              class="text-center ma-2 pa-0"
              v-text="card.title"
            ></v-card-subtitle>
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
  </div>
  <div v-else>Not Found</div>
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
  }),
  mounted() {
    // ページ順(ここでは取得しないこちらはクライアント側)
    //console.log('page_name=', this.page_name)
    //store.state.pages
    //console.log('store.state.pages: ', store.state.pages);
  },
}
</script>
