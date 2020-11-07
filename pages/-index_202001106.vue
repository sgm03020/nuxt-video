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
        class="my-2 pa-2 xmgin30"
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
            <v-row dense class="justify-center py-1 primary">
              {{ card.title }}
            </v-row>
            <LazyYoutubeVideo :src="card.src" preview-image-size="hqdefault" />
            <v-row dense class="justify-center"> </v-row>
            <!-- </div> -->
          </div>
          <!-- {{ page }} -->
          <template #customPaging>
            <div class="custom-dots">
              <button type="button">
                <i class="mdi mdi-circle" />
              </button>
            </div>
          </template>
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
import { GetRootTopics } from '../queries/index.gql'

export default {
  components: {
    Logo,
    VuetifyLogo,
    VueSlickCarousel,
    LazyYoutubeVideo,
  },
  created() {
    // console.log('process.env: ', process.env);
    // console.log('GetRootTopics:', print(GetRootTopics));
    // console.log('GetRootTopics2:', print(GetRootTopics2));
  },
  async asyncData({ app }) {
    // console.log('index.vue async asyncData')
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

    // video情報取得処理
    try {
      // 取得
      const { data } = await app.$hasura({
        query: print(GetRootTopics),
      })
      // console.log(data)
      return {
        loading: true,
        video_contents_array: data.video_contents_master,
      }
    } catch (err) {
      console.log('err: ', err)
      return {
        loading: true,
        video_contents_array: minimalData,
      }
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

<style lang="scss">
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
  color: var(--v-secondary-base);
  /* background-color: red !important; */
}

.theme--dark .custom-dots button::before {
  // 以下でドットの大きさ指定
  font-size: 20px;
  line-height: 20px;
  // color: var(--v-info-base) !important;
  color: var(--v-secondary-lighten4) !important;
}

.theme--light .custom-dots button::before {
  // 以下でドットの大きさ指定
  font-size: 20px;
  line-height: 20px;
  // color: var(--v-info-base) !important;
  color: var(--v-secondary-darken1) !important;
  opacity: 0.35;
}

.slick-dots {
  bottom: -30px;
  width: 100%;
  padding: 0 !important;
  margin: 0;
  list-style: none;
  text-align: center;
}

// .slick-dots li button::before {
//   font-size: 20px !important;
//   line-height: 20px;
//   color: cyan;
// }

// .slick-dots li button::before {
//   font-size: 20px;
//   line-height: 20px;
//   // color: cyan;
//   color: var(--v-info-base);
// }

// .slick-dots li.slick-active button::before {
//   // color: white;
//   color: var(--v-info-base);
// }

.slick-box {
  width: 200px;
}

.slick-img {
  margin: auto;
}

.test {
  color: red;
}

.custom-arrow {
  // position: absolute;
  // top: 100%;
  font-size: 30px;
  color: red;
  &:hover {
    color: blue;
  }
}

.xmgin30 {
  margin-left: 30px;
  margin-right: 30px;
}

// .custom-dots button{
//   color: var(--v-info-base) !important;
// }
</style>



