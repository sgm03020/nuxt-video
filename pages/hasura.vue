<template>
  <div>
    <ul v-for="(conference, index) in conferences" :key="index">
      <li>{{ conference.name }}</li>
    </ul>
  </div>
</template>


<script>
//import Vue from 'vue'
//import '@nuxt/http'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

// conferences(order_by: { date: desc })
// orderがoderになっておりエラーが発生していたが、
// まるで分からなかった
const QUERY = gql`
  query {
    conferences(order_by: { date: desc }) {
      name
      place
      date
    }
  }
`
export default {
  // 以下のエラーの場合は
  // Property '$axios' does not exist on type 'Context'
  // https://github.com/nuxt/typescript/issues/180
  // import '@nuxtjs/axios'を加える
  async asyncData({ app }) {
    console.log(print(QUERY))
    // $hasuraはプラグインとして登録しており
    // 引数をappとして、app.$hasuraとアクセスする
    const { data } = await app.$hasura({
      query: print(QUERY),
    })
    return {
      conferences: data.conferences
    }
  },
}
</script>


