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
  async asyncData({ error, redirect, app, params }) {
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
    }
    //console.log('params=', params)
    const slug = await params.slug // When calling /abc the slug will be "abc"
    if (['upper', 'lower', 'stretch', 'topics'].indexOf(slug) < 0) {
      // TODO
      // 404エラー
      // throw new Error('Not Found');
      //redirect('/')
      //throw new Error('server error')
      //return true
      //error({ statusCode: 404, message: 'Not Found' })
      // return redirect('/error')
      //  return { notfound: true, slug: '', page_name: 'Not Found' }
    }
    try {
      const { data } = await app.$hasura({
        query: print(GET_VIDEO_BY_PAGE),
        variables: {
          tag_name: `${slug}`,
        },
      })

      //console.log('data=', data)
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

      // 次のページ先を算出
      // TODO 以下の配列はhasuraから取得するのが理想
      const pageNameArray = [
        { topics: 'トピックス' },
        { upper: '上半身' },
        { lower: '下半身' },
        { stretch: 'ストレッチ他' },
      ]
      if (data.video_pages['0'].page_name) {
        const pagename = data.video_pages['0'].page_name
        // console.log('pagename: ', pagename);
        let findIndex = -1
        for (let i = 0; i < pageNameArray.length; i++) {
          // console.log('pageNameArray[i]: ', pageNameArray[i]);
          // オブジェクト型にしてしまったので、route名はkeyになってしまった
          let key = Object.keys(pageNameArray[i])[0]
          if (key == slug) {
            findIndex = i
            break
          }
        }
        // console.log('pagenum: ', findIndex)
        if (findIndex >= 0) {
          const pageindex = (findIndex + 1) % pageNameArray.length
          const nextroute = '/' + Object.keys(pageNameArray[pageindex])[0]
          const nextpagename = Object.values(pageNameArray[pageindex])[0]
          console.log(nextroute)
          return {
            notfound: false,
            slug,
            page_name: pagename,
            next_route: nextroute,
            next_page_name: nextpagename,
            video_contents_array: data.video_pages['0'].video_contents_master, //data.video_contents_master,
          }
        }
      }
      //
    } catch (err) {
      error({ statusCode: 404, message: 'Server Error' })
      return
    }

    return {
      notfound: false,
      slug: data.video_pages['0'].page_name,
      page_name: data.video_pages['0'].page_name,
      video_contents_array: data.video_pages['0'].video_contents_master, //data.video_contents_master,
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
  },
}
</script>
