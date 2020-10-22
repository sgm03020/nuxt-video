export default function ({ $http, $config, env }, inject) {
  //console.log(env.API_HASURA_URL)
  console.log($config.api_url)
  const $hasura = $http.create({
    // prefixUrl: env.API_HASURA_URL,
    prefixUrl: $config.api_url,
  })
  // 以下はなるべく設定しないようにする
  //$hasura.setHeader('X-Hasura-Admin-Secret','password')

  inject('hasura', $hasura.$post.bind($hasura, ''))
}
