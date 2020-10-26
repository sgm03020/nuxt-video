//export default function ({ $http, env }, inject) {
export default function ({ $http, env, $config }, inject) {
  // 現在 nuxt.config.jsで env.API_HASURA_URLを無効化中
  // console.log(env.API_HASURA_URL)
  // console.log('config.api_url:', $config.api_url)
  const $hasura = $http.create({
    // prefixUrl: env.API_HASURA_URL,
    prefixUrl: $config.api_url,
  })
  // 以下はなるべく設定しないようにする
  //$hasura.setHeader('X-Hasura-Admin-Secret','password')

  inject('hasura', $hasura.$post.bind($hasura, ''))
}
