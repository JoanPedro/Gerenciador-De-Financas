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
    variables,
    update: (proxy, { data: { createRecord } }) => {
      const month = moment(createRecord.date.substr(0, 10)).format('MM-YYYY')
      const variables = { month }
      // Records
      try {
        const recordsData = proxy.readQuery({
          query: RecordsQuery,
          variables
        })

        recordsData.records = [...recordsData.records, createRecord]
        proxy.writeQuery({
          query: RecordsQuery,
          variables,
          data: recordsData
        })
      } catch (e) {
        console.log('Query "records" has not been read yet!', e)
      }

      // Total balance
      try {
        const currentDate = moment().endOf('day')
        const recordDate = moment(createRecord.date.substr(0, 10))
        const variables = { date: currentDate.format('YYYY-MM-DD') }

        if (recordDate.isBefore(currentDate)) {
          const totalBalanceData = proxy.readQuery({
            query: TotalBalanceQuery,
            variables
          })

          totalBalanceData.totalBalance = +(totalBalanceData.totalBalance + createRecord.amount).toFixed(2)

          proxy.writeQuery({
            query: TotalBalanceQuery,
            variables,
            data: totalBalanceData
          })
        }
      } catch (e) {
        console.log('Query "totalBalance" has not been read yet!', e)
      }
    }
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
