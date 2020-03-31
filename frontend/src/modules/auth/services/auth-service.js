import apollo, { onLogin } from '@/plugins/apollo'
import LoginMutation from './../graphql/Login.graphql'
import SignUpMutation from './../graphql/SignUp.graphql'

const login = async variables => {
  const res = await apollo.mutate({
    mutation: LoginMutation,
    variables
  })
  const { login } = res.data
  await onLogin(apollo, login.token)
  return login
}

const signup = async variables => {
  const res = await apollo.mutate({
    mutation: SignUpMutation,
    variables
  })
  const { signup } = res.data
  await onLogin(apollo, signup.token)
  return signup
}
export default {
  login,
  signup
}
