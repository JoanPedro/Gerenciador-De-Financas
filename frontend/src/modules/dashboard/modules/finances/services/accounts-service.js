import apollo from '@/plugins/apollo'
import AccountsQuery from './../graphql/Accounts.graphql'

const accounts = async () => {
  const res = await apollo.query({
    query: AccountsQuery
  })
  return res.data.accounts
}

export default {
  accounts
}