import apollo from '@/plugins/apollo'
import moment from 'moment'
import RecordsQuery from './../graphql/Records.graphql'
import TotalBalanceQuery from './../graphql/TotalBalance.graphql'

const records = async variables => {
  const res = await apollo.query({
    query: RecordsQuery,
    variables
  })
  return res.data.records
}

const totalBalance = async () => {
  const res = await apollo.query({
    query: TotalBalanceQuery,
    variables: {
      date: moment().format('YYYY-MM-DD')
    }
  })
  return res.data.totalBalance
}

export default {
  records,
  totalBalance
}
