<template>
  <div>
    <v-btn color="primary" class="ma-2" v-on:click="updateConferences">更新</v-btn>
    <ul v-for="(conference, index) in conferences" :key="index">
      <li>{{ conference.name }}</li>
    </ul>
  </div>
</template>

<!--
<script lang="ts">
export default Vue.extend({
  ...})
としてTypeScriptで書くには、かなり面倒な作業となる。
mountedなどでthis.プラグインみたいに使うためには
プラグインを書き換えなければならず
こらがかなり面倒だ。
以下が公式のtypescriptでのプラグインの書き方
https://typescript.nuxtjs.org/ja/cookbook/plugins.html#iii-%E8%A4%87%E5%90%88%E3%82%A4%E3%83%B3%E3%82%B7%E3%82%99%E3%82%A7%E3%82%AF%E3%83%88

-->

<script>
//import Vue from 'vue'
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
  //export default Vue.extend({
  // 以下のエラーの場合は
  // Property '$axios' does not exist on type 'Context'
  // https://github.com/nuxt/typescript/issues/180
  // import '@nuxtjs/axios'を加える
  // またはimport '@nuxt/http'
  async asyncData({ app }) {
    console.log(print(QUERY))
    // $hasuraはプラグインとして登録しており
    // asyncData内ではthis.が使えないことから
    // 引数をappとして、app.$hasuraとアクセスする
    const { data } = await app.$hasura({
      query: print(QUERY),
    })
    return {
      conferences: data.conferences, //これがdataへ入る
    }
  },
  data: () => ({
    conferences: [],
  }),
  mounted() {
    //this.$myInjectedFunction('test')
    //this.$hasura2({query:print(QUERY)})
  },
  methods: {
    async updateConferences() {
      // プラグインのSetIntervalを使って定期に
      // conferencesを取得しようとしたが、
      // 保留(今はボタンでの更新)
      // asyncDataで作られたhtmlが
      // ここでdataとして取得してマージされる
      console.log('updateConferences')
      console.log(this.conferences)
      const { data } = await this.$hasura({
        query: print(QUERY),
      })
      // hasuraからの戻りでdataのconferences配列を上書きする
      this.conferences = data.conferences
      // console.log(this.conferences)
    },
  },
}
</script>


