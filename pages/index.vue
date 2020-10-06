<template>
  <div>
    <div>ABCDEFG</div>
    <div>
      <client-only>
        <carousel-3d
          v-show="1"
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
            <!-- Slide 1 Content -->
            <!-- <img src="https://placehold.it/360x270" /> -->
            <v-img
              width="320"
              height="180"
              :lazy-src="require('assets/images/default.jpg')"
              src="https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg"
            >
            </v-img>
          </slide>
        </carousel-3d>
      </client-only>
    </div>
  </div>
</template>


<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
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

