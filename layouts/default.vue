<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- v-app-barの表示制御を行う場合  -->
    <!-- :hidden="this.$store.state.isHideBar" -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <!-- <v-spacer /> -->
      <!-- &nbsp;&nbsp; -->
      <v-chip v-if="0" class="ma-0 pa=0"> 今井店 </v-chip>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <transition name="page">
          <nuxt />
        </transition>
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed> -->
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      width="auto"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
        <br />
        <v-row justify="center" align-content="center" no-gutters>
          <v-col cols="12">
            <v-list-item class="">
              <!-- <v-date-picker v-model="picker" color="green lighten-1">
              </v-date-picker> -->
              <!--
              <v-calendar locale="ja-jp"
                :day-format="timestamp => new Date(timestamp.date).getDate()"
                :month-format="timestamp => ('')"
              ></v-calendar>
              -->
              <v-date-picker
                v-if="0"
                v-model="picker"
                locale="jp-ja"
                color="green lighten-1"
                :day-format="(date) => new Date(date).getDate()"
                :events="arrayEvents"
                event-color="red lighten-1"
              ></v-date-picker>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: ['CollectionMiddleware'],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
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
        {
          icon: 'mdi-chart-bubble',
          title: 'トピックス',
          to: '/videos/topics',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '上半身',
          to: '/videos/upper',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '下半身',
          to: '/videos/lower',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ストレッチ',
          to: '/videos/stretch',
        },
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
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30)
      const d = new Date()
      d.setDate(day)
      return d.toISOString().substr(0, 10)
    })
    // AppBarの表示制御
    // this.isHideBar = this.$store.state.isHideBar
    console.log('default.vue mounted')
    //this.$store.commit('setHideBar', false)
    //this.$store.commit('setHideBar', true)
  },
  methods: {
    functionEvents(date) {
      const [, , day] = date.split('-')
      if ([12, 17, 28].includes(parseInt(day, 10))) return true
      if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
      return false
    },
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