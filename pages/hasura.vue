<template>
  <div>
    <ul v-for="(conference, index) in conferences" :key="index">
      <li>{{ conference.name }}</li>
    </ul>
  </div>
</template>


<script>
import Vue from 'vue'
//import '@nuxt/http'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

const QUERY = gql`
  query {
    conferences(oder_by: { date: desc }) {
      name
      place
      date
    }
  }
`
export default Vue.extend({
  // 以下のエラーの場合は
  // Property '$axios' does not exist on type 'Context'
  // https://github.com/nuxt/typescript/issues/180
  // import '@nuxtjs/axios'を加える

  async asyncData({ app }) {
    // $hasuraはプラグインとして登録しており
    // 引数をappとして、app.$hasuraとアクセスする

    //const res = await $http
    // ここではdataすらも利用不可能である
    // FMSsAXLJ7i0
    // https://img.youtube.com/vi/FMSsAXLJ7i0/default.jpg
    // https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg
    //const url_tmb = 'https://img.youtube.com/vi/ZoXdmxYa90c/default.jpg'
    //const image0 = await $axios.$get(url_tmb)
    //console.log(image0)
    //return { image0 }
    const { data } = await app.$hasura({
      query: print(QUERY),
    })
    return {
      conferences: data.conferences,
    }
  },
})
</script>


