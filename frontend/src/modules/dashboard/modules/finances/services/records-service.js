import apollo from '@/plugins/apollo.js'
import RecordsQuery from './../graphql/Records.graphql'

const records = async variables => {
  res = await apollo.query({
    query: RecordsQuery,
    variables
  })
  return res.data.records
}

export default {
  records
}
