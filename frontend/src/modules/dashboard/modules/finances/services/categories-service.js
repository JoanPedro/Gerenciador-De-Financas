import apollo from '@/plugins/apollo'
import CategoriesQuery from './../graphql/Categories.graphql'

const categories = async ({ operation }) => {
  const res = await apollo.query({
    query: CategoriesQuery,
    variables: { operation: operation ? operation.toUpperCase() : operation }
  })
  return res.data.categories
}

export default {
  categories
}
