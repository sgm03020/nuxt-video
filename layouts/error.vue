<template>
  <v-container class="ma-4 pa-4">
    <v-row>
      <h3 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h3>
      <h3 v-else>
        {{ otherError }}
      </h3>
    </v-row>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-container>
</template>

<script>
export default {
  layout: 'nothing',
  // ページコンポーネントの定義
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>
<!--
<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  mounted() {
    console.log('error.vue mounted')
    this.$store.commit('setHideBar', true)
  },
  destroyed() {
    this.$store.commit('setHideBar', false)
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
-->