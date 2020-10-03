<!--
<template>
  <v-container class="">    
    <v-row justify="center">
      <v-col>
        <LazyYoutubeVideo
          src="https://www.youtube.com/embed/4JS70KB9GS0"
          preview-image-size="sddefault"
          aspect-ratio="1:1"
        />
      </v-col>
      <v-col>
        <LazyYoutubeVideo
          src="https://www.youtube.com/embed/4JS70KB9GS0"
          preview-image-size="sddefault"
          aspect-ratio="1:1"
        />
      </v-col>
      <v-col>
        <LazyYoutubeVideo
          src="https://www.youtube.com/embed/4JS70KB9GS0"
          preview-image-size="sddefault"
          aspect-ratio="1:1"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
-->
<template>
  <v-container fluid>
    <h1>Gallery</h1>
    <h2>おすすめの動画</h2>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
        <v-card>
          <!-- <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          > -->
          <LazyYoutubeVideo
            :src="card.src"
            :preview-image-size="card.previewImageSize"
            :aspect-ratio="card.aspectRatio"
            :thumbnail-listeners="{ load: foo }"
          />

          <!-- <v-card-title v-text="card.title"></v-card-title> -->
          <v-card-subtitle class="text-center ma-2 pa-0" v-text="card.title"></v-card-subtitle>
          <!-- </v-img> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
//import 'vue-lazy-youtube-video/dist/style.css'
import LazyYoutubeVideo from 'vue-lazy-youtube-video'

export default {
  components: {
    LazyYoutubeVideo,
  },
  data: () => ({
    cards: [
      {
        title: '開設',
        src: 'https://www.youtube.com/embed/ZoXdmxYa90c',
        previewImageSize: 'maxresdefault',
        flex: 12,
      },
      // {
      //   title: 'Favorite road trips',
      //   src: 'https://www.youtube.com/embed/4JS70KB9GS0',
      //   previewImageSize: 'hqdefault',
      //   flex: 6,
      // },
      // hqdefault sddefault mqdefault
      {
        title: '腿上げ',
        id: '4JS70KB9GS0',
        src: 'https://www.youtube.com/embed/C9nzVgyEvRU',
        //https://www.youtube.com/watch?v=C9nzVgyEvRU
        previewImageSize: 'sddefault',
        flex: 6,
      },
      {
        title: '腹筋',
        src: 'https://www.youtube.com/embed/BQJmBtIqYtU',
        previewImageSize: 'sddefault',
        flex: 6,
      },
      {
        title: '懸垂',
        src: 'https://www.youtube.com/embed/izgJ5GxR3Tg',
        previewImageSize: 'sddefault',
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
