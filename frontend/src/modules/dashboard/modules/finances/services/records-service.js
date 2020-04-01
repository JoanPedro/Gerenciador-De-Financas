import apollo from '@/plugins/apollo'
import RecordsQuery from './../graphql/Records.graphql'

const records = async variables => {
  const res = await apollo.query({
    query: RecordsQuery,
    variables
  })
  return res.data.records
}

export default {
  records
}
