import apollo from '@/plugins/apollo'
import LoginMutation from './../graphql/Login.graphql'

const login = async variables => {
  const res = await apollo.mutate({
    mutation: LoginMutation,
    variables
  })
  return res.data.login
}

export default {
  login
}