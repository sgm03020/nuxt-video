<template>
  <v-app dark>
    <v-main>
      <v-container class="ma-0 pa-0">
        <!-- <div>{{pages}}</div> -->
        <transition name="page">
          <nuxt />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      minimalItems: [
        {
          page_name: 'Welcome Page',
          page_order: 0,
          icon: 'mdi-apps',
          full_path: '/',
        },
        // {
        //   page_name: 'Testing',
        //   page_order: 9999,
        //   icon: ' mdi-vector-arrange-above',
        //   full_path: '/transitions',
        // },
      ],
      items: [
        {
          page_name: 'Welcome Page',
          icon: 'mdi-apps',
          full_path: '/',
        },
        // {
        //   icon: 'mdi-apps',
        //   title: 'Welcome',
        //   to: '/',
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire',
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Gallery',
        //   to: '/gallery',
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Hasura',
        //   to: '/hasura',
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'トピックス',
        //   to: '/videos/topics',
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: '上半身',
        //   to: '/videos/upper',
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: '下半身',
        //   to: '/videos/lower',
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'ストレッチ',
        //   to: '/videos/stretch',
        // },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "SAM's Video Library",
      picker: new Date().toISOString().substr(0, 10),
      arrayEvents: null,
      isHideBar: false,
    }
  },
  mounted() {
    // this.arrayEvents = [...Array(6)].map(() => {
    //   const day = Math.floor(Math.random() * 30)
    //   const d = new Date()
    //   d.setDate(day)
    //   return d.toISOString().substr(0, 10)
    // })
    console.log('default.vue mounted')
  },
  methods: {
    // functionEvents(date) {
    //   const [, , day] = date.split('-')
    //   if ([12, 17, 28].includes(parseInt(day, 10))) return true
    //   if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
    //   return false
    // },
  },
}
</script>

<!-- 主に v-date-picker のイベントの印を調節 -->
<style lang="scss">
// .v-date-picker-table__events > div {
//   border-radius: 50%;
//   display: block;
//   height: 8px;
//   margin: 0 1px;
//   width: 8px;
//   opacity: 0.6;
// }
// .v-date-picker-table--date .v-date-picker-table__events {
//   bottom: auto;
//   left: auto;
//   width: auto;
// }
//
// transition
//
.page-enter {
  opacity: 0;
}
.page-enter-active {
  transition: opacity 2s;
}
</style>