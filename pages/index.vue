<template>
  <div>
    <div></div>
    <v-container>
      <v-row justify="center" align="center" class="pa-0 mb-6">
        <v-card-title class="justify-center ma-0 pa-0">
          Welcome to SAM's Video Library
        </v-card-title>
      </v-row>
    </v-container>
    <div>
      <client-only>
        <div class="justify-center text-center">
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
            <img
              width="320"
              height="216"
              :src="require('assets/images/0.jpg')"
            />
          </div>

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
            class=""
          >
            <slide
              class="text-center ma-0 pa-0 black"
              v-for="(card, i) in cards"
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
                :preview-image-size="card.previewImageSize"
                aspect-ratio="16:9"
                :thumbnail-listeners="{ load: foo }"
              />
            </slide>
          </carousel-3d>
        </div>
      </client-only>
      <v-row class="mr-4 mt-10">
        <v-spacer />
        <v-btn color="primary" nuxt to="/gallery">次のページ</v-btn>
      </v-row>
    </div>
  </div>
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
    //const url_tmb = 'https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg'
    //const image0 = await $axios.$get(url_tmb)
    //console.log(image0)
    //return { image0 }
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

