export default function ({ $http, env }, inject) {
  //console.log(env.API_HASURA_URL)
  const $hasura = $http.create({
    prefixUrl: env.API_HASURA_URL,
  })
  $hasura.setHeader('X-Hasura-Admin-Secret','password')

  inject('hasura', $hasura.$post.bind($hasura, ''))
}
