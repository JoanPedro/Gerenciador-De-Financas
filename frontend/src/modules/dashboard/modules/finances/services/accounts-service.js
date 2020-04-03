import apollo from '@/plugins/apollo'
import AccountCreateMutation from './../graphql/AccountCreate.graphql'
import AccountsQuery from './../graphql/Accounts.graphql'
const accounts = async () => {
  const res = await apollo.query({
    query: AccountsQuery
  })
  return res.data.accounts
}

const createAccount = async variables => {
  const res = await apollo.mutation({
    mutation: AccountCreateMutation,
    variables,
    update: (proxy, { data: { createAccount } }) => {
      try {
        const data = proxy.readQuery({
          AccountsQuery
        })
        data.accounts = [...data.accounts, createAccount]
        proxy.writeQuery({
          query: AccountsQuery,
          data
        })
      } catch (e) {
        console.log('Query "accounts" has not been read yet!', e)
      }
    }
  })
  return res.data.createAccount
}

export default {
  accounts,
  createAccount
}
