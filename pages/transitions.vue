<template>
  <div>
    <h2>Transitions Page</h2>
    <v-container v-if="0" fluid>
      <v-row dense>
        <v-col
          v-for="(card, index) in video_contents_array"
          :key="index"
          :cols="card.flex"
        >
          <v-card>
            <LazyYoutubeVideo
              :src="card.src"
              :preview-image-size="card.previewImageSize"
              :aspect-ratio="card.aspectRatio"
              :thumbnail-listeners="{ load: () => {} }"
            />
            <v-card-subtitle
              class="text-center ma-2 pa-0"
              v-text="card.title"
            ></v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-2 justify-space-between">
        <v-btn color="primary" nuxt to="/"> 最初のページ </v-btn>
        <v-btn color="primary" nuxt :to="{ path: `${next_route}` }">{{
          next_page_name
        }}</v-btn>
      </v-row>
    </v-container>
    <p>
      <v-btn
        v-for="(item, index) in filteredList.pages"
        v-on:click="category_id = item.page_id"
        rounded
        class="indigo darken-3 mx-2 my-2"
        :key="index"
      >
        {{item.page_name}}
      </v-btn>
      <!-- <v-btn @click="category_id = 0">0</v-btn>
      <v-btn @click="current = 1">1</v-btn>
      <v-btn @click="current = 2">2</v-btn>
      <v-btn @click="category_id = 1003">1003</v-btn> -->
    </p>

    <!-- v-for="(card, index) in filteredList" -->
    <div class="videos">
      　<transition-group tag="ul" class="videos__list">
        <li
          class="videos__item"
          v-for="(card, index) in filteredList.list"
          :data-index="index"
          :key="card.id"
        >
          <!-- {{card.id}} -->
          <!-- <LazyYoutubeVideo src="https://www.youtube.com/embed/4JS70KB9GS0" /> -->
          <LazyYoutubeVideo :src="card.src" />
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import { GetVideoTransitions } from '../queries/index.gql'
const basePath = '/videos'

// Hasura QUERY
// 基本の4つ取りクエリ
const QUERY = gql`
  query {
    video_contents_master(limit: 25, order_by: { id: asc }) {
      id
      contents_id
      category_id
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
    LazyYoutubeVideo,
  },
  async asyncData({ error, redirect, app, params, route, store }) {
    try {
      const { data } = await app.$hasura({
        query: print(GetVideoTransitions),
      })
      return {
        category_id: 0,
        video_contents_array: data.video_contents_master,
      }
    } catch (err) {
      return {
        category_id: 0,
        video_contents_array: [],
      }
    }
  },
  data: () => ({
    page_name: '',
    page_index: 0,
    next_route: '',
    page_array: ['topics', 'upper', 'lower', 'stretch'],
    video_contents_array: [],
    // 以下transitionテスト
    category_id: 0,
    current: 0,
    list: [
      {
        title: 'IFrame',
        contents_id: '4JS70KB9GS0',
        category_id: '1',
        id: '1',
        url: 'https://www.youtube.com/embed/4JS70KB9GS0',
        src: 'https://www.youtube.com/embed/4JS70KB9GS0',
        tmb: 'https://img.youtube.com/vi/4JS70KB9GS0/default.jpg',
        previewImageSize: 'sddefault',
        flex: 12,
      },
      {
        title: '開設1',
        contents_id: 'ZoXdmxYa90c',
        category_id: '1',
        id: '2',
        url: 'https://www.youtube.com/embed/ZoXdmxYa90c',
        src: 'https://www.youtube.com/embed/ZoXdmxYa90c',
        tmb: 'https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg',
        previewImageSize: 'default',
        flex: 12,
      },
      {
        title: '開設2',
        contents_id: 'ZoXdmxYa90c',
        category_id: '2',
        id: '3',
        url: 'https://www.youtube.com/embed/ZoXdmxYa90c',
        src: 'https://www.youtube.com/embed/ZoXdmxYa90c',
        tmb: 'https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg',
        previewImageSize: 'default',
        flex: 12,
      },
    ],
  }),
  computed: {
    filteredList() {
      const pages = this.$store.state.pages
      return {
        pages,
        list: this.video_contents_array.filter(
          (el) =>
            this.category_id === 0 || el.category_id === `${this.category_id}`
        ),
      }
    },
  },
  mounted() {
    // ページ順(ここでは取得しないこちらはクライアント側)
    //console.log('page_name=', this.page_name)
    //store.state.pages
    //console.log('store.state.pages: ', store.state.pages);
  },
}
</script>

<style lang="scss" scoped>
$gap: 20px;
p {
  text-align: center;
}
.videos {
  &__list {
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
    width: calc(50% - #{$gap / 2});

    &:nth-child(n + 3) {
      margin-top: $gap;
    }
  }
}

/* トランジション用スタイル */
.v-enter-active,
.v-leave-active,
.v-move {
  transition: opacity 1s, transform 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>