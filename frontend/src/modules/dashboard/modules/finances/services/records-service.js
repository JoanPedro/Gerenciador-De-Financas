import apollo from '@/plugins/apollo'
import moment from 'moment'
import RecordCreateMutation from './../graphql/RecordCreate.graphql'
import RecordsQuery from './../graphql/Records.graphql'
import TotalBalanceQuery from './../graphql/TotalBalance.graphql'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'

const createRecord = async variables => {
  const res = await apollo.mutate({
    mutation: RecordCreateMutation,
    variables
  })
  return res.data.createRecord
}

const records = variables => {
  const queryRef = apollo.watchQuery({
    query: RecordsQuery,
    variables
  })
  return from(queryRef)
    .pipe(
      map(res => res.data.records)
    )
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
  createRecord,
  records,
  totalBalance
}
