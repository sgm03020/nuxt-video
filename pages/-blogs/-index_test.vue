<template>
  <section>
    <div>Blogs Index.vue</div>
    <v-btn @click="() => this.$router.push({path: '/blogs/hello-world', params: { id: 'hello-world'}})">
        次
    </v-btn>
    <v-btn to="/blogs/hello-world">Next Page</v-btn>
  </section>
</template>



<script>
export default {
  components: {
  },
}
</script>

