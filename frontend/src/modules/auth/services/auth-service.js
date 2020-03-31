import apollo, { onLogin } from '@/plugins/apollo'
import LoginMutation from './../graphql/Login.graphql'

const login = async variables => {
  const res = await apollo.mutate({
    mutation: LoginMutation,
    variables
  })
  const { login } = res.data
  await onLogin(apollo, login)
  return login
}

export default {
  login
}