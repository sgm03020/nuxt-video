<template>
  <div>
    <v-container>
      <v-row justify="center" align="center" class="pa-0 mb-6">
        <v-card-title class="justify-center ma-0 pa-0">
          Welcome to SAM's Video Library
        </v-card-title>
      </v-row>
      <!-- <v-btn color="primary" v-on:click="click">TEST</v-btn> -->
      <div v-if="0" v-show="!loading" class="justify-center text-right">
        <v-btn color="primary" v-on:click="updateRecommendedContens()"
          >おすすめ</v-btn
        >
        <v-btn color="primary" v-on:click="updateVideoContens(1004)"
          >ストレッチ</v-btn
        >
        <v-btn color="primary" v-on:click="updateVideoContens(1002)"
          >上半身</v-btn
        >
        <v-btn color="primary" v-on:click="updateVideoContens(1003)"
          >下半身</v-btn
        >
        <!-- <v-btn color="primary" v-on:click="updateVideoContens(0)">更新</v-btn> -->
      </div>
      <div v-else v-show="!loading" class="justify-center text-right">
        <v-banner single-line sticky>ダイジェスト</v-banner>
      </div>
    </v-container>
    <div>
      <!-- <div class="justify-center text-center"> -->
      <div
        v-show="loading"
        style="
          width: 100%;
          height: 216px;
          margin: 20px 0;
          z-index: 10;
          opacity: 0.3;
        "
        class="justify-center text-center pa-0"
      >
        <img width="320" height="216" :src="require('assets/images/0.jpg')" />
      </div>
      <!-- </div> -->
      <client-only>
        <div class="justify-center text-center">
          <carousel-3d
            v-show="!loading"
            ref="carousel"
            :count="video_contents_array.length"
            :controls-visible="false"
            :clickable="false"
            :controls-prev-html="'&#10092;'"
            :controls-next-html="'&#10093;'"
            :controls-width="30"
            :controls-height="60"
            :width="320"
            :height="180 + 36 + 0"
            :onMainSlideClick="void 0"
            @after-slide-change="onAfterSlideChange"
            class=""
          >
            <!-- <slide
              class="text-center ma-0 pa-0 black"
              v-for="(card, i) in cards"
              :index="i"
              :key="i"
            > -->
            <slide
              ref="slide"
              class="text-center ma-0 pa-0 black"
              v-for="(card, i) in video_contents_array"
              :index="i"
              :key="i"
            >
              <!-- style="height: 36px; background-color: transparent" -->
              <!-- class -->
              <!-- blue-grey darken-4  -->
              <v-row
                class="ma-0 pa-0"
                style="height: 36px"
                dense
                no-gutters
                justify="center"
                align-content="center"
              >
                {{ card.title }}
              </v-row>
              <!-- Slide 1 Content -->
              <!-- <img src="https://placehold.it/360x270" /> -->
              <!-- src="https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg" -->
              <v-img
                v-if="i != slideIndex"
                width="320"
                height="180"
                :lazy-src="require('assets/images/default.jpg')"
                :src="card.tmb"
              >
              </v-img>
              <LazyYoutubeVideo
                v-else
                :src="card.src"
                :preview-image-size="card.previewsize"
                aspect-ratio="16:9"
                :thumbnail-listeners="{ load: foo }"
              />
            </slide>
          </carousel-3d>
        </div>
      </client-only>
      <v-row v-show="!loading" class="mr-4 mt-10">
        <v-spacer />
        <v-btn color="primary" nuxt to="/videos/topics">トピックス</v-btn>
      </v-row>
    </div>
  </div>
</template>


<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
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
  query GetVideoContents($category_id: String!) {
    video_contents_master(
      where: { category_id: { _eq: $category_id } }
      limit: 3
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
// おすすめ動画抽出1
const GET_RECOMMENDED_CONTENTS1 = gql`
  query GetRecommendedContents {
    video_recommended_contents {
      recommended_id
      video_contents_master {
        id
        contents_id
        url
        src
        title
        tmb
        previewsize
      }
    }
  }
`
// おすすめ動画抽出2(where句を利用)
const GET_RECOMMENDED_CONTENTS2 = gql`
  query GetRecommendedContents {
    video_contents_master(
      where: {
        video_recommended_contents: { recommended_id: { _is_null: false } }
      }
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
// テスト用query
const QUERY1 = gql`
  query {
    video_contents_master(
      where: { category_id: { _eq: "1004" } }
      limit: 3
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

export default {
  components: {
    Logo,
    VuetifyLogo,
    LazyYoutubeVideo,
  },
  data: () => ({
    loading: true,
    slideIndex: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
    model: 0,
    cards: [
      {
        title: '開設',
        id: 'ZoXdmxYa90c',
        src: 'https://www.youtube.com/embed/ZoXdmxYa90c',
        tmb: 'https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg',
        previewImageSize: 'default',
        flex: 12,
      },
      {
        title: '腿上げ',
        id: 'C9nzVgyEvRU',
        src: 'https://www.youtube.com/embed/C9nzVgyEvRU',
        tmb: 'https://img.youtube.com/vi/C9nzVgyEvRU/default.jpg',
        previewImageSize: 'default',
        flex: 6,
      },
      {
        title: '腹筋',
        id: 'BQJmBtIqYtU',
        src: 'https://www.youtube.com/embed/BQJmBtIqYtU',
        tmb: 'https://img.youtube.com/vi/BQJmBtIqYtU/default.jpg',
        previewImageSize: 'default',
        flex: 6,
      },
      {
        title: '開設',
        id: 'ZoXdmxYa90c',
        src: 'https://www.youtube.com/embed/ZoXdmxYa90c',
        tmb: 'https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg',
        previewImageSize: 'default',
        flex: 6,
      },
      {
        title: '懸垂',
        id: 'izgJ5GxR3Tg',
        src: 'https://www.youtube.com/embed/izgJ5GxR3Tg',
        tmb: 'https://img.youtube.com/vi/izgJ5GxR3Tg/default.jpg',
        previewImageSize: 'default',
        flex: 6,
      },
    ],
    video_contents_array: [],
  }),
  async asyncData({ app }) {
    // ここではdataすらも利用不可能である
    // FMSsAXLJ7i0
    // https://img.youtube.com/vi/FMSsAXLJ7i0/default.jpg
    // https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg
    //const url_tmb = 'https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg'
    //const image0 = await $axios.$get(url_tmb)
    //console.log(image0)
    //return { image0 }
    // 取得
    const { data } = await app.$hasura({
      query: print(QUERY),
    })
    return {
      video_contents_array: data.video_contents_master,
    }
  },
  async fetch({ app, store }) {
    // ページ情報をストアへ登録する(fetchの役割)
    // const GetVideoPages = await app.$hasura({
    //   query: print(GET_VIDEO_PAGES),
    // })
    // const pages = GetVideoPages.data.video_pages
    // if (pages) store.commit('pages', pages)
  },
  computed: {
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
    // エラー時にApp Barを非表示にするようにしたので
    // index読み込み時には必ず表示するように以下
    // console.log('index.vue mounted')
    // this.$store.commit('setHideBar', false)

    // モジュールモードindex.js
    // console.log('pages=', this.$store.state.pages)

    // モジュールモードでindex以外はgettersが使える
    //console.log(this.$store.getters['collection/hoge'])

  },
  methods: {
    foo() {
      // console.log('bar')
    },
    click() {
      alert('click')
      let counter = this.$store.getters['counter']
      console.log('counter: ', counter)
    },
    onAfterSlideChange(index) {
      // console.log(
      //   '@onAfterSlideChange Callback Triggered',
      //   'Slide Index ' + index
      // )
      this.slideIndex = index
    },
    // 動画コンテンツ情報配列の更新
    // vpc(video primary category)
    async updateVideoContens(cat) {
      // POST to Hasura
      const { data } = await this.$hasura({
        query: print(GET_VIDEO_CONTENTS),
        variables: {
          category_id: `${cat}`,
        },
      })
      //console.log('data=', data)
      this.video_contents_array = data.video_contents_master
      this.$refs.carousel.goSlide(0)
      this.slideIndex = 0
    },
    async updateRecommendedContens() {
      // POST to Hasura パターン2
      const { data } = await this.$hasura({
        query: print(GET_RECOMMENDED_CONTENTS2),
      })
      console.log(data)
      //this.video_contents_array.splice(0, this.video_contents_array.length)
      this.video_contents_array = data.video_contents_master
      /*
      // POST to Hasura  パターン1
      const { data } = await this.$hasura({
       query: print(GET_RECOMMENDED_CONTENTS1),
      })
      //console.log(data)
      //console.log(data.video_recommended_contents)
      // 配列クリア
      this.video_contents_array.splice(0, this.video_contents_array.length)
      // オブジェクト配列のアクセス方法
      for (let key in data.video_recommended_contents) {
        //console.log(data.video_recommended_contents[key])
        let obj = data.video_recommended_contents[key].video_contents_master
        this.video_contents_array.push(obj)
      }
      */

      // 共通
      //this.video_contents_array = data.video_contents_master
      this.$refs.carousel.goSlide(0)
      this.slideIndex = 0
    },
  },
}
</script>



<style lang="scss" scoped>
$text-color: #eff1ff;
// $background-color: #04009d;
$background-color: #666;
// $background-color-dark: #06004d;
$background-color-dark: #111;
.ff7-card {
  // border: solid 1px #424542;
  // box-shadow: 1px 1px #e7dfe7, -1px -1px #e7dfe7, 1px -1px #e7dfe7,
  //   -1px 1px #e7dfe7, 0 -2px #9c9a9c, -2px 0 #7b757b, 0 2px #424542;
  // padding: 5px 10px;
  // background: $background-color;
  background: transparent;
  background: -moz-linear-gradient(
    top,
    $background-color 0%,
    $background-color-dark 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, $background-color),
    color-stop(100%, $background-color-dark)
  );
  background: -webkit-linear-gradient(
    top,
    $background-color 0%,
    $background-color-dark 100%
  );
  background: -o-linear-gradient(
    top,
    $background-color 0%,
    $background-color-dark 100%
  );
  background: -ms-linear-gradient(
    top,
    $background-color 0%,
    $background-color-dark 100%
  );
  background: linear-gradient(
    to bottom,
    $background-color 0%,
    $background-color-dark 100%
  );
  filter: progid:dximagetransform.microsoft.gradient( startcolorstr='$background-color', endcolorstr='$background-color-dark',gradienttype=0 );
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  border-radius: 7px;
  * {
    color: $text-color;
    text-shadow: 2px 2px #212421, 1px 1px #212021;
    font-family: Verdana, sans-serif;
    font-weight: normal;
  }
}
</style>

