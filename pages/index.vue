<template>
  <v-container ma-0 pa-0>
    <v-row justify="center" align="center" class="ma-0 pa-0">
      <v-col cols="12" sm="12" md="12" class="ma-0 pa-0">
        <div class="text-center"></div>
        <v-card class="ma-0 pa-0">
          <v-card-title class="headline">
            Welcome to SAM's Online App
          </v-card-title>
          <br />
          <br />
          <carousel-3d
            :controls-visible="true"
            :clickable="false"
            :controls-prev-html="'&#10092;'"
            :controls-next-html="'&#10093;'"
            :controls-width="30"
            :controls-height="340"
            :width="320"
            :height="320"
          >
            <slide v-for="(card, i) in cards" :index="i" :key="i">
              <!-- <v-img :src="'https://img.youtube.com/vi/' + card.id + '/0.jpg'">
            </v-img> -->
              <LazyYoutubeVideo
                :src="card.src"
                :preview-image-size="card.previewImageSize"
                aspect-ratio="1:1"
                :thumbnail-listeners="{ load: foo }"
              />
            </slide>
          </carousel-3d>
          <v-carousel v-if="0">
            <v-carousel-item v-for="(card, i) in cards" :key="i">
              <v-img
                :src="'https://img.youtube.com/vi/' + card.id + '/0.jpg'"
              ></v-img>
              <!-- <v-img src="https://picsum.photos/id/11/500/300">{{card.id}}</v-img> -->
            </v-carousel-item>
          </v-carousel>
          <v-card-text>
            <p>スポーツネットワークSAMのオンラインAppページです。</p>
            <p></p>
            <p></p>
            <p></p>
            <p>
              Thank you for developing with Vuetify and I look forward to
              bringing more exciting features in the future.
            </p>
            <div class="text-xs-right">
              <!-- <em><small>&mdash; John Leider</small></em> -->
            </div>
            <br />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" nuxt to="/gallery"> Continue </v-btn>
          </v-card-actions>
        </v-card>
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
        id: '4JS70KB9GS0',
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
</style>>
