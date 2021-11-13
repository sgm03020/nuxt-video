<template>
  <div class="">
    <LazyYoutubeVideo src="https://www.youtube.com/embed/SsUg86Q22tE" />
  </div>
</template>

<script>
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import 'vue-lazy-youtube-video/dist/style.simplified.css'

export default {
  components: {
    LazyYoutubeVideo,
  },
  created() {},
  async asyncData({ app }) {},
  async mounted() {},
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
  data: () => ({}),
  watch: {},
  computed: {},
  methods: {},
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
  // 現在13文字分
  //
  // grid-template-columns: 32px 32px 32px 32px 32px 32px 32px 32px 32px 32px 32px 32px 32px;
  // grid-template-columns: 28px 28px 28px 28px 28px 28px 28px 28px 28px 28px 28px 28px 28px;
  //
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
  transition: 1.7s cubic-bezier(0, 0.08, 0.05, 1);
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
  // transition: all 1.5s cubic-bezier(0, 0.08, 0.05, 1);
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
    // transition: 0.7s cubic-bezier(0, 0.08, 0.05, 1);
    // transition: all 1.5s cubic-bezier(0, 0.08, 0.05, 1);
    transition: 1.5s cubic-bezier(0, 0.08, 0.05, 1);
    // transition: 1.7s cubic-bezier(1, 1, 1, 1);
    // transition: 1.7s;
    // animation: gapvideo 0.6s ease-in-out;
    animation: gapvideo 0.2s ease-in-out;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }
}
// 追加
.videos__list li {
  // 上の&__itemより優先
  // transition: all 1.5s cubic-bezier(0, 0.08, 0.05, 1);
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
