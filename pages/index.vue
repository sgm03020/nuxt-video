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
        <carousel-3d
          :controls-visible="true"
          :clickable="false"
          :controls-prev-html="'&#10092;'"
          :controls-next-html="'&#10093;'"
          :controls-width="30"
          :controls-height="224"
          :width="320"
          :height="180 + 34 + 0"
          :onMainSlideClick="click"
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
                style="height: 34px; background-color: transparent"
                dense
                no-gutters
                justify="center"
                align-content="center"
              >
                {{ card.title }}
              </v-row>
              <!-- v-if="i != slideIndex" -->
              <v-img
                
                width="320"
                height="180"
                :src="'https://img.youtube.com/vi/' + card.id + '/default.jpg'"
              >
              </v-img>
              <!-- <v-row
              style="height: 34px; background-color: transparent"
              dense
              no-gutters
              justify="center"
              align-content="center"
            >
              {{ card.title }}
            </v-row> -->
              <!-- <LazyYoutubeVideo
                :src="card.src"
                :preview-image-size="card.previewImageSize"
                aspect-ratio="16:9"
                :thumbnail-listeners="{ load: foo }"
              /> -->
          </slide>
        </carousel-3d>
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
    slideIndex: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
    model: 0,
    cards: [
      {
        title: '開設',
        id: 'ZoXdmxYa90c',
        src: 'https://www.youtube.com/embed/ZoXdmxYa90c',
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
        previewImageSize: 'default',
        flex: 6,
      },
      {
        title: '腹筋',
        id: 'BQJmBtIqYtU',
        src: 'https://www.youtube.com/embed/BQJmBtIqYtU',
        previewImageSize: 'default',
        flex: 6,
      },
      {
        title: '開設',
        id: 'ZoXdmxYa90c',
        src: 'https://www.youtube.com/embed/ZoXdmxYa90c',
        previewImageSize: 'default',
        flex: 6,
      },
      {
        title: '懸垂',
        id: 'izgJ5GxR3Tg',
        src: 'https://www.youtube.com/embed/izgJ5GxR3Tg',
        previewImageSize: 'default',
        flex: 6,
      },
    ],
  }),
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
