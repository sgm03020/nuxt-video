import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import { GetVideoPages } from '../queries/index.gql'

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
    const response_pages = await app.$hasura({
      query: print(GetVideoPages),
    })
    const pages = await response_pages.data.video_pages
    if (pages) {
      // 以下にもawait必要
      await store.commit('setPages', pages)
    }
    // console.log('store commit pages: ', pages)
  } catch (err) {
    console.log('CollectionMiddleware http query error: ', err)
    // この場合、storeにpages情報がないことになる
    // (indexは稼働する)
  }
}
