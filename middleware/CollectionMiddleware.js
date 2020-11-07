import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import { GetVideoPages } from '../queries/index.gql'
import { GetRootTopics } from '../queries/index.gql'

export default async function ({ app, store }) {
  // do something
  // console.log('config.api_url:', $config.api_url)

  if (process.server) {
    // const { req, res, beforeNuxtRender } = context
    console.log('process.server')
  }
  // const { ip } = await app.$axios.$get('http://icanhazip.com')
  // console.log('ip: ', ip);

  // ページ情報取得・ストアへの登録
  try {
    // 何かしら登録してある場合はもう登録しない
    // if (store.state.pages && store.state.pages.length > 0) {
    // console.log('CollectionMiddleware return')
    // return
    // }
    if (!store.state.pages || store.state.pages.length === 0) {
      const response_pages = await app.$hasura({
        query: print(GetVideoPages),
      })
      const pages = await response_pages.data.video_pages
      if (pages) {
        // 以下にもawait必要
        await store.commit('setPages', pages)
      }
      // console.log('store commit pages: ', pages)
    }

    if (!store.state.topics || store.state.topics.length === 0) {
      // TopicsのVideoだけはここでstoreへ登録する
      const response_topics = await app.$hasura({
        query: print(GetRootTopics),
      })
      const topics = await response_topics.data.video_contents_master
      if (topics) {
        // 以下にもawait必要
        await store.commit('setTopics', topics)
      }
    }
  } catch (err) {
    console.log('CollectionMiddleware http query error: ', err)
    // この場合、storeにpages情報がないことになる
    // (indexは稼働する)
  }
}
