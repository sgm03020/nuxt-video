<template>
  <div v-if="!notfound">
    <h2>{{ this.slug }}</h2>
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
      <v-row>
        <v-spacer />
        <v-btn color="primary" nuxt to="/"> 最初のページ </v-btn>
      </v-row>
    </v-container>
  </div>
  <div v-else>
      Not Found
  </div>
</template>

<script>
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

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
const GET_VIDEO_BY_PAGE = gql`
  query GetVideoByPage($tag_name: String!) {
    video_pages(where: { page_tag_name: { _eq: $tag_name } }) {
      page_id
      page_name
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
  async asyncData({ app, params }) {
    if (params == undefined) {
      console.log('params is undefined.')
      return
    }
    console.log('params=', params)
    const slug = await params.slug // When calling /abc the slug will be "abc"
    // console.log('slug=', slug)
    // return { slug }
    if (slug == undefined || slug == '') {
      console.log('slug is undefined.')
    }
    if (['upper', 'lower', 'stretch', 'topics'].indexOf(slug) < 0) {
      return { notfound: true }
    }

    const { data } = await app.$hasura({
      query: print(GET_VIDEO_BY_PAGE),
      variables: {
        tag_name: `${slug}`,
      },
    })

    console.log('data=', data)
    //let pageName = undefined
    //console.log('page= ', data.video_pages['0'])
    //pageContents = data.video_pages['0'].video_contents_master
    //pageName = data.video_pages['0'].page_name

    //   for (let key in data.video_pages) {
    //       console.log(key)
    //       pageContents = data.video_pages[key].video_contents_master
    //       pageName = data.video_pages[key].page_name
    //       break
    //   }
    // オブジェクトアクセスでとりあえず['0']決め打ちにしておく
    return {
      slug: data.video_pages['0'].page_name,
      video_contents_array: data.video_pages['0'].video_contents_master, //data.video_contents_master,
    }
  },
  data: () => ({
    video_contents_array: [],
  }),
}
</script>
