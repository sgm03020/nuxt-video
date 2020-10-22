<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-if="0" class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card v-if="1" class="justify-center transparent">
        <v-card-title class="justify-center transparent">
          Welcome to the SAM's Movies
        </v-card-title>
      </v-card>
      <div class="text-right mx-4 pa-2">
        <span>ダイジェスト</span>
      </div>
      <div
        v-show="!loading"
        v-if="video_contents_array.length > 0"
        class="my-2 mx-4 pa-2"
      >
        <VueSlickCarousel :arrows="true" :dots="true">
          <div
            :centerMode="true"
            v-for="(card, i) in video_contents_array"
            :index="i"
            :key="i"
            class=""
          >
            <!-- <div> -->
            <!-- <v-img :src="card.tmb" class="slick-img" /> -->
            <!-- :thumbnail-listeners="{ load: foo }" -->
            <!-- :preview-image-size="card.previewsize" -->
            <v-row dense class="justify-center py-2 grey darken-4">
              {{ card.title }}
            </v-row>
            <LazyYoutubeVideo :src="card.src" preview-image-size="hqdefault" />
            <v-row dense class="justify-center"> </v-row>
            <!-- </div> -->
          </div>
        </VueSlickCarousel>
      </div>
      <v-row v-show="!loading" class="mr-4 mt-10">
        <v-spacer />
        <v-btn color="primary" nuxt to="/videos/topics">トピックス</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import 'vue-lazy-youtube-video/dist/style.simplified.css'

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

export default {
  components: {
    Logo,
    VuetifyLogo,
    VueSlickCarousel,
    LazyYoutubeVideo,
  },
  async asyncData({ app, $axios, $http }) {
    // ここではdataすらも利用不可能である
    // FMSsAXLJ7i0
    // https://img.youtube.com/vi/FMSsAXLJ7i0/default.jpg
    // https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg
    //const url_tmb = 'https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg'
    //const image0 = await $axios.$get(url_tmb)
    //console.log(image0)
    //return { image0 }
    const minimalData = [
      {
        title: '開設',
        contents_id: 'ZoXdmxYa90c',
        id: 'ZoXdmxYa90c',
        url: 'https://www.youtube.com/embed/ZoXdmxYa90c',
        src: 'https://www.youtube.com/embed/ZoXdmxYa90c',
        tmb: 'https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg',
        previewImageSize: 'default',
        flex: 12,
      },
    ]
    
    // try {
    //   const ip = await $http.$get('http://icanhazip1.com')
    //   console.log(ip)
    // } catch (err) {
    //   console.log('err: ', err)
    // }

    try {
      // 取得
      const { data } = await app.$hasura({
        query: print(QUERY),
      })
    } catch (err) {
      console.log('err: ', err)
      return {
        loading: true,
        video_contents_array: minimalData,
      }
    }
    // console.log(data)
    return {
      loading: true,
      video_contents_array: data.video_contents_master,
      // video_contents_array: [],
    }
  },
  data: () => {},
  async mounted() {
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
}
</script>

<style>
/* .slick_track {
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
} */

.slick-prev {
  left: -35px !important;
}

.slick-next {
  right: -25px;
}

button.slick-prev::before,
button.slick-next::before {
  font-size: 30px !important;

  /* background-color: red !important; */
}

.slick-dots {
  bottom: -30px;
  width: 100%;
  padding: 0 !important;
  margin: 0;
  list-style: none;
  text-align: center;
}

.slick-dots li button::before {
  font-size: 20px;
  line-height: 20px;
  color: cyan;
}
.slick-dots li.slick-active button::before {
  color: white;
}
.slick-box {
  width: 200px;
}

.slick-img {
  margin: auto;
}

.test {
  color: red;
}
</style>


