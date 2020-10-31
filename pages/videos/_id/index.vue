<template>
  <div v-if="!notfound">
    <h2>{{ page_name }}</h2>
    <!-- <p>contents_id:{{ $route.query.id }}</p> -->
    <transition-group>
      <v-container
        v-if="$route.query.id && $route.query.id !== ''"
        key="1"
        fluid
      >
        <!-- <p>{{ $route.query.id }}</p> -->
        <!-- <p>{{ getIndex }}</p> -->
        <div>
          <v-btn :to="$route.path" rounded class="primary mx-2 my-2">
            戻る
          </v-btn>
        </div>
        <v-card>
          <LazyYoutubeVideo
            :src="this.video_contents_array[getIndex].src"
            :preview-image-size="
              this.video_contents_array[getIndex].previewImageSize
            "
            :aspect-ratio="this.video_contents_array[getIndex].aspectRatio"
            :thumbnail-listeners="{ load: () => {} }"
          />
          <v-card-subtitle
            class="text-center ma-0 py-3"
            v-text="this.video_contents_array[getIndex].title"
          ></v-card-subtitle>
        </v-card>
      </v-container>

      <v-container v-show="!$route.query.id" fluid key="0">
        <v-row dense>
          <v-col
            v-for="(card, index) in video_contents_array"
            :key="index"
            :cols="card.flex"
          >
            <v-card elevation="3">
              <!-- <LazyYoutubeVideo
              :src="card.src"
              :preview-image-size="card.previewImageSize"
              :aspect-ratio="card.aspectRatio"
              :thumbnail-listeners="{ load: () => {} }"
            /> -->
              <!-- <v-img :src="card.tmb"> </v-img> -->
              <router-link class="py-0 my-0" :to="'?id=' + card.contents_id">
                <v-img :src="card.tmb" :lazy-src="card.tmb.replace('maxresdefault','default')"></v-img>
              </router-link>
              <!-- <nuxt-link tag="img" :src="card.tmb" to="/locations"> </nuxt-link> -->
              <!-- <v-card-subtitle
              class="text-center ma-2 pa-0"
              v-text="card.title"
            ></v-card-subtitle> -->
                <!-- <v-btn
                  v-show="1"
                  color="orange lighten-2"
                  class="ma-0 py-1"
                  text
                  :to="'?id=' + card.contents_id"
                > -->
              <v-card-title class="justify-center subtitle-1 ma-0 py-0">
                <v-btn
                  v-show="1"
                  color="warning"
                  class="ma-0 py-1"
                  text
                  :to="'?id=' + card.contents_id"
                >
                  {{ card.title }}
                </v-btn>
              </v-card-title>
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
    </transition-group>
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
</style>