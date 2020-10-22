import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

export default async function ({ app, store, $http, $hasura }) {
  // do something
  const GET_VIDEO_PAGES = gql`
    query GetVideoPages {
      video_pages(
        where: { enabled: { _eq: "1" } }
        order_by: { page_id: asc }
      ) {
        page_id
        page_tag
        page_name
        base_path
        full_path
      }
    }
  `
  if (process.server) {
    // const { req, res, beforeNuxtRender } = context
    console.log('process.server')
  }
  // const { ip } = await app.$axios.$get('http://icanhazip.com')
  // console.log('ip: ', ip);
  /*
  try {
    const GetVideoPages = await app.$hasura({
      query: print(GET_VIDEO_PAGES),
    })
    const pages = GetVideoPages.data.video_pages
    if (pages) store.commit('setPages', pages)
    // console.log('store commit pages: ', pages)
  } catch (err) {
    console.log('CollectionMiddleware http query error: ', err)
    // この場合、storeにpages情報がないことになる
    // (indexは稼働する)
  }
  */
}
