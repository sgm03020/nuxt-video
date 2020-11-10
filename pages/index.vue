<template>
  <div class="">
    <div :style="{ position: 'absolute', top: 0 }" class="mt-4">
      <v-btn v-if="0" color="primary" @click="gather()">{{ show }}</v-btn>
      <!-- <div>now: {{ this.$vssHeight }} - mounted: {{ this.mountedHeight }}</div> -->
      <v-btn color="primary" to="/videos/topics">トピックス</v-btn>
    </div>
    <div class="parent ma-0 pa-0 justify-center text-center">
      <!-- 以下のdivへは -->
      <!-- justify-center text-center -->
      <!-- を入れない方がよい(ちゃんと升目にならないから) -->
      <!-- :style="{
        'z-index': show ? 100 : 1}" -->
      <!-- :style="baseStyles" -->

      <div class="base" v-show="!loading && mountedHeight !==0 " @click="show = !show" :style="baseStyles">
        <transition-group
          tag="div"
          class="textbox"
          @before-enter="beforeEnter"
          @enter="enter"
          @before-leave="beforeEnter"
          @leave="leave"
        >
          <div
            v-for="(datas, index) in textModel"
            v-show="show === true"
            :key="'datas' + index"
            class="text-square"
          >
            <h2>{{ datas }}</h2>
          </div>
        </transition-group>
      </div>

      <!-- <LazyYoutubeVideo src="https://www.youtube.com/embed/SsUg86Q22tE" /> -->
      <!-- :style="{ 'z-index': show ? 50 : 50 }" -->
      <div class="videos mx-0 px-0">
        <transition-group
          tag="ul"
          class="videos__list mx-0 px-0"
          @before-enter="beforeEnter"
          @enter="enter"
          @before-leave="beforeEnter"
          @leave="leave"
        >
          <!-- <div class="videos__list"> -->
          <!-- LazyYoutubeVideoに食わせる場合、配列はストア->computedを通したものでないと表示できない -->
          <li
            v-show="show === false"
            v-for="card in storetopics"
            :key="card.id"
            class="videos__item justify-center text-center"
            :class="'col-' + card.flex"
          >
            <!-- 一気にYoutubeを表示する場合 -->
            <!-- {{ card.id }} -->
            <!-- <LazyYoutubeVideo src="https://www.youtube.com/embed/SsUg86Q22tE" /> -->
            <!-- <LazyYoutubeVideo :src="card.src" previewImageSize="sddefault" /> -->
            <!-- パターン(1) -->
            <!-- <v-img
              :src="card.tmb"
              @click="() => $router.push('videos/topics')"
            /> -->
            <!-- パターン(2) -->
            <v-card>
              <v-img rounded :src="card.tmb" @click="show = !show" />
            </v-card>
            <!-- 以下だと、col-6などが効かなくなる -->
            <!-- <router-link to="/videos/topics"><img :src="card.tmb" /></router-link> -->
            <!-- <nuxt-link :src="card.tmb" tag="img" to="/videos/topics"></nuxt-link> -->
          </li>
          <!-- </div> -->
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import 'vue-lazy-youtube-video/dist/style.simplified.css'
import { GetRootTopics } from '../queries/index.gql'
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'

export default {
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  components: {
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
      {
        title: '腿上げ',
        contents_id: '4JS70KB9GS0',
        id: '4JS70KB9GS0',
        url: 'https://www.youtube.com/embed/4JS70KB9GS0',
        src: 'https://www.youtube.com/embed/4JS70KB9GS0',
        tmb: 'https://img.youtube.com/vi/4JS70KB9GS0/default.jpg',
        previewImageSize: 'default',
        flex: 6,
      },
      {
        title: '腹筋',
        contents_id: 'BQJmBtIqYtU',
        id: 'BQJmBtIqYtU',
        url: 'https://www.youtube.com/embed/BQJmBtIqYtU',
        src: 'https://www.youtube.com/embed/BQJmBtIqYtU',
        tmb: 'https://img.youtube.com/vi/BQJmBtIqYtU/default.jpg',
        previewImageSize: 'default',
        flex: 6,
      },
    ]

    // ADD
    // const mainText = 'Hello world this is Vue!'
    const mainText = ' SAM  ONLINE     Video    L I B R A R Y'
    const textModel = mainText.split('')

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
        show: true,
        mountedHeight: 0,
        textModel: textModel,
        video_contents_array: data.video_contents_master,
        // video_contents_array: minimalData,
      }
    } catch (err) {
      console.log('err: ', err)
      return {
        loading: true,
        show: true,
        mountedHeight: 0,
        textModel: textModel,
        video_contents_array: minimalData,
      }
    }
  },
  async mounted() {
    setTimeout(() => {
      this.loading = false
    }, 500)
    //
    // this.textModel = this.text.split('')
    this.mountedHeight = this.$vssHeight
  },
  props: {
    position: {
      type: String,
      default: 'absolute',
    },
    top: {
      type: String,
      default: '50px',
    },
  },
  data: () => {
    return {
      mountedHeight: 0
    }
  },
  // data() {
  //   return {
  //     show: false,
  //     // text: 'Hello world this is Vue!',
  //     // textModel: [],
  //     cards: [
  //       {
  //         title: '開設',
  //         id: 'ZoXdmxYa90c',
  //         src: 'https://www.youtube.com/embed/ZoXdmxYa90c',
  //         previewImageSize: 'maxresdefault',
  //         flex: 12,
  //       },
  //       {
  //         title: '腿上げ',
  //         id: '4JS70KB9GS0',
  //         src: 'https://www.youtube.com/embed/C9nzVgyEvRU',
  //         // https://www.youtube.com/watch?v=C9nzVgyEvRU
  //         previewImageSize: 'sddefault',
  //         flex: 6,
  //       },
  //       {
  //         title: '腹筋',
  //         id: 'BQJmBtIqYtU',
  //         src: 'https://www.youtube.com/embed/BQJmBtIqYtU',
  //         previewImageSize: 'sddefault',
  //         flex: 6,
  //       },
  //     ],
  //   }
  // },
  // computed: {
  //   textShow() {
  //     const text = this.show ? 'Remove' : 'Show'
  //     return text
  //   },
  // },
  computed: {
    textShow() {
      const text = this.show ? 'Remove' : 'Show'
      return text
    },
    // ストアの状態から storeitems を表示
    storetopics() {
      // console.log('default.vue computed topics:', this.$store.state.topics)
      // console.log('this.$store.state.pages: ', this.$store.state.pages);
      return this.$store.state.topics
    },
    baseStyles() {
      return {
        position: 'absolute',
        // top: `${this.$vssHeight / 3 - 40 - 56}px`,
        top: `${this.mountedHeight / 3 - 40 - 56}px`,
        // top: `0px`,
        left: '50%',
        transform: 'translateX(-50%)',
        // 'background-color': 'blue',
      }
    },
  },
  methods: {
    beforeEnter(el) {
      const x = (Math.random() - 0.5) * 1600
      const y = (Math.random() - 0.5) * 1600
      const ss = Math.random() + 1
      const rr = (Math.random() - 0.5) * 200

      el.style.opacity = 0
      el.style.transform =
        'translate(' +
        x +
        'px,' +
        y +
        'px)rotate(' +
        rr +
        'deg)scale(' +
        ss +
        ')'
    },
    enter(el) {
      setTimeout(() => {
        el.style.opacity = 1
        // el.style.transform = 'translate(0px,20px)'
        el.style.transform = 'translate(0px,0px)'
      }, 0)
    },
    beforeLeave(el) {
      el.style.opacity = 1
      // el.style.transform = 'translate(0px,20px)'
      el.style.transform = 'translate(0px,0px)'
    },
    leave(el) {
      setTimeout(() => {
        const x = (Math.random() - 0.5) * 400
        const y = (Math.random() - 0.5) * 400
        const ss = Math.random() + 1
        const rr = (Math.random() - 0.5) * 200
        el.style.opacity = 0
        el.style.transform =
          'translate(' +
          x +
          'px,' +
          y +
          'px)rotate(' +
          rr +
          'deg)scale(' +
          ss +
          ')'
      }, 0)
    },
    gather() {
      // control the gather or scatter
      this.show = !this.show
    },
  },
}
</script>

<style lang="scss" scoped>
.parent {
  position: relative;
  // top: 0;
  // 以下の3つで左右中央
  // left: 0;
  // right: 0;
  // margin: 0 auto;
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
.textbox {
  // pointer-events: auto;
  //.v-navigation-drawer--fixed { z-index: 6 }
  // navigationなどは6になっており、100とかだと上に来てしまう
  z-index: 0;
  display: grid;
  // justify-content: center;
  // grid-template-columns: 48px 48px 48px 48px 48px 48px 48px 48px 48px 48px 48px;
  // grid-template-columns: 32px 32px 32px 32px 32px 32px 32px 32px 32px 32px 32px;
  grid-template-columns: 32px 32px 32px 32px 32px 32px 32px 32px 32px 32px 32px 32px 32px;
  grid-template-columns: 28px 28px 28px 28px 28px 28px 28px 28px 28px 28px 28px 28px 28px;
  // grid-template-columns: 32px 32px 32px 32px 32px 32px 32px 32px 32px 32px;
  // TEST
  // background-color: yellowgreen;
  // padding: 10px 0 10px 0;
  // height: 240px;
  // margin-top: 0;
  // padding-top: 0;
}
.text-square {
  // height: 32px;
  height: 34px;
  // border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;

  // transition: 0.4s cubic-bezier(0, 0.08, 0.05, 1);
  transition: 0.7s cubic-bezier(0, 0.08, 0.05, 1);
  // animation: gapping 0.6s ease-in-out;
  animation: gapping 0.2s ease-in-out;
  animation-delay: 1s;
  // animation-delay: 0.1s;
  animation-fill-mode: forwards;
}
@keyframes gapping {
  from {
    margin: 0;
  }
  to {
    margin: 0;
    // margin: 4px;
    // margin: 0 0 4px 0;
  }
}
.text-square:nth-child(3n-2) {
  // background-color: rgba(192, 0, 0, 0.4);
  // background-color: rgba(0, 0, 0, 0.1);
  // background-color: rgba(0, 0, 0, 1);
  // font-size: 24px;
  padding: 0;
}
.text-square:nth-child(6n-3) {
  // background-color: rgba(0, 0, 0, 0.2);
  // background-color: rgba(100, 0, 0, 0.3);
  padding: 0;
}
.textbox div {
  // transition: all 1.5s cubic-bezier(0, 0.08, 0.05, 1);
  transition: all 1.5s cubic-bezier(0, 0.08, 0.05, 1);
  // padding: 2px;
  // font-size: 24px;
}
h2 {
  // font-size: 24px;
  // font-size: 20px;
  // font-size: 20px;
  // color: rgba(100, 100, 100, 1);
  color: rgba(192, 192, 192, 1);
}

//
// TEST ADD
//
@keyframes gapvideo {
  from {
    margin: 0;
  }
  to {
    // margin: 4px;
    margin: 0;
  }
}

$gap1: 10px;
p {
  text-align: center;
}
.videos {
  margin-top: 70px;
  // pointer-events: auto;
  // pointer-events: none;
  // background-color: rgba(0, 192, 192, 0.6);
  // position: relative;
  // 現在、以下の3つを採用
  // absoluteなのにはいろいろ理由がある
  // absoluteにするとwidth:100%を付けないと
  // 横へ広がってしまう
  // 以下3行はいったん停止
  // (footerの2020年の帯の下にvideosのエリアが表示されてしまうので)
  // また幅が広がってしまう現象はなぜか大丈夫になった
  // position: absolute;
  // width: 100%;
  // margin-top: 50px;
  // ここまで採用
  // top: -160px;
  // top: 0;
  // margin-top: 50px;

  // height: 240px;
  // margin: 0 0 0 0;
  // padding: 20px 0 20px 0;
  // padding-bottom: 100px;
  &__list {
    // z-index追加
    // z-index: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-left: 0;
    margin: {
      top: 0;
      bottom: 0;
    }

    list-style: none;

    /** ↑の行でlintエラーとなるためstylelint.config.jsへルール追加 */
  }

  &__item {
    // vuetifyのcol-[数字]を使う場合は以下からコメント化
    // ここからコメント化
    // width: calc(50% - #{$gap1 / 2});

    // &:first-child {
    //   width: 100%;
    //   // padding-bottom: 10px;
    // }

    // &:nth-child(n + 3) {
    //   margin-top: $gap1;
    // }
    // ここまでコメント化

    // transition: 0.4s cubic-bezier(0, 0.08, 0.05, 1);
    transition: 0.7s cubic-bezier(0, 0.08, 0.05, 1);
    // animation: gapvideo 0.6s ease-in-out;
    animation: gapvideo 0.2s ease-in-out;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }
}
// 追加
.videos__list li {
  transition: all 1.5s cubic-bezier(0, 0.08, 0.05, 1);
  box-shadow: 0 0 20px #000;
}

.base {
  // 現在はcomputed->propsを経てscreenのサイズを見て計算してから
  // 決めるように変更
  // ここの設定はprops->computedへ移す
  // 以下の1つはcomputedへ転載
  // position: absolute;
  // ここから今は不採用
  // background-color: violet;
  // background-color: transparent;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // height: 160px;
  // left: 0;
  // right: 0;
  // margin: auto;
  // ここまで今は不採用
  // 以下の2つはcomputedへ転載
  // left: 50%;
  // transform: translateX(-50%);
}
// .container {
//   padding-left: 4px;
//   padding-right: 4px;
// }
// .grand {
//   position: relative;
//   top: 0;
// }
</style>



