<template>
  <div>
    <div>
      {{ $route.query }}
    </div>
    <div>
      {{ $route.params }}
    </div>
  <div>
    {{list}}
  </div>
    <v-btn
      @click="() => this.$router.push(`?id=hello-world`)"
    >Hello World</v-btn>
    <v-btn
      @click="() => this.$router.push({ path: 'hoge', query: { xyz: 123 } })"
    >hoge</v-btn>
  </div>
</template>


<script>
export default {
  async asyncData({app, route}) {
    console.log(route)
    return {}
  },
  computed: {
    list() {
      console.log(this.$route)
      return this.$route.query
    },
  },
}
</script>
