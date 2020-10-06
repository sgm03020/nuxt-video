<template>
  <v-container ma-0 pa-0>
    <v-row justify="center" align="center" class="ma-0 pa-0">
      <v-col cols="12" sm="12" md="12" class="ma-0 pa-0">
        <div class="text-center"></div>
        <!-- <v-card class="ma-0 pa-0"> -->
        <!-- <v-card-title class="headline justify-center"> -->
        <v-card-title class="justify-center">
          <!-- Welcome to SAM's Online -->
          Welcome to SAM's Video Library
        </v-card-title>
        <v-row v-if="0" class="justify-space-between pa-2" dense>
          <v-avatar color="indigo" size="96">
            <span class="white--text"> Pointゲット </span>
          </v-avatar>
          <v-avatar color="orange" size="96">
            <span class="white--text"> お知らせ </span>
          </v-avatar>
          <v-avatar color="teal" size="96">
            <span class="white--text"> ログイン </span>
          </v-avatar>
        </v-row>

        <!-- ダミー -->
        <!-- <v-row v-if="0" justify="center" align-content="center"> -->
        <!-- text-align: center; -->
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
          <!-- <v-row
            style="height: 34px; background-color: transparent"
            dense
            no-gutters
            justify="center"
            align-content="center"
          >
            {{ this.cards[0].title }}
          </v-row> -->
          <img width="320" height="216" :src="require('assets/images/0.jpg')" />
        </div>
        <!-- </v-row> -->
        <!-- <v-row v-if="1" justify="center" align-content="center"> -->
        <!-- <div v-show="!loading" style="z-index: 1; opacity: 0.5"> -->
        <!-- divなどを間に入れると初期表示でうまく表示できないことがある -->
        <carousel-3d
          v-show="!loading"
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
        >
          <slide
            class="text-center pt-0"
            style="background-color: black"
            v-for="(card, i) in cards"
            :index="i"
            :key="i"
          >
            <v-row
              style="height: 36px; background-color: transparent"
              dense
              no-gutters
              justify="center"
              align-content="center"
            >
              {{ card.title }}
            </v-row>
            <!-- v-if="i != slideIndex" -->
            <v-img
              v-if="i != slideIndex"
              width="320"
              height="180"
              :lazy-src="require('assets/images/default.jpg')"
              :src="'https://img.youtube.com/vi/' + card.id + '/default.jpg'"
            >
            </v-img>
            <!-- :src="'https://img.youtube.com/vi/' + card.id + '/default.jpg'" -->
            <!-- <img src="~/assets/image.jpg" />             -->
            <!-- <v-row
              style="height: 34px; background-color: transparent"
              dense
              no-gutters
              justify="center"
              align-content="center"
            >
              {{ card.title }}
            </v-row> -->
            <!-- <v-row height="34px"  class="justify-center">
              {{ card.title }}
            </v-row> -->
            <LazyYoutubeVideo
              v-if="i == slideIndex"
              :src="card.src"
              :preview-image-size="card.previewImageSize"
              aspect-ratio="16:9"
              :thumbnail-listeners="{ load: foo }"
            />
            <v-row
              v-if="0"
              style="height: 34px; background-color: transparent"
              dense
              no-gutters
              justify="center"
              align-content="center"
            >
            </v-row>
          </slide>
        </carousel-3d>
        <!-- </div> -->
        <!-- </v-row> -->
        <v-card-text>
          <p>Thank you for watching. This page is for SAM's Video Library.</p>
          <p></p>
          <p>
            <!-- Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future. -->
          </p>
          <div class="text-xs-right">
            <!-- <em><small>&mdash; John Leider</small></em> -->
          </div>
          <br />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/gallery"> 次のページ </v-btn>
        </v-card-actions>
        <!-- </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import LazyYoutubeVideo from 'vue-lazy-youtube-video'

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
        // title: '',
        id: 'ZoXdmxYa90c',
        src: 'https://www.youtube.com/embed/ZoXdmxYa90c',
        tmb: 'https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg',
        previewImageSize: 'default',
        flex: 12,
      },
      // maxresdefault
      // {
      //   title: 'Favorite road trips',
      //   id: '4JS70KB9GS0',
      //   src: 'https://www.youtube.com/embed/4JS70KB9GS0',
      //   previewImageSize: 'hqdefault',
      //   flex: 6,
      // },
      {
        title: '腿上げ',
        id: 'C9nzVgyEvRU',
        src: 'https://www.youtube.com/embed/C9nzVgyEvRU',
        //https://www.youtube.com/watch?v=C9nzVgyEvRU
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
  }),
  async asyncData({ $axios }) {
    // ここではdataすらも利用不可能である
    // FMSsAXLJ7i0
    // https://img.youtube.com/vi/FMSsAXLJ7i0/default.jpg
    // https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg
    const url_tmb = 'https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg'
    const image0 = await $axios.$get(url_tmb)
    //console.log(image0)
    return { image0 }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  methods: {
    foo() {
      console.log('bar')
    },
    click() {
      alert('click')
    },
    onAfterSlideChange(index) {
      console.log(
        '@onAfterSlideChange Callback Triggered',
        'Slide Index ' + index
      )
      this.slideIndex = index
    },
  },
}
</script>

<style lang="scss">
.carousel-3d-container {
  // ここでlazy loadする画像のdivと位置を調節する
  // デフォルトでは20px 0になっている
  // margin: 0 0 !important;
  //
  // padding-bottom: 20px !important;
  // margin-bottom: 20px !important;
  // 前後移動ボタンの色
  a span {
    color: white;
  }
  .carousel-3d-slide {
    // 各スライド
    // padding: 1px;
    // background-color: black;
    .title {
      font-size: 22px;
    }
  }
}
</style>
>
