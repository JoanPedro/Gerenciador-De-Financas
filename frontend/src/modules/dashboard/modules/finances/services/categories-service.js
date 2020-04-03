import apollo from '@/plugins/apollo'
import CategoriesQuery from './../graphql/Categories.graphql'
import CategoryCreateMutation from './../graphql/CategoryCreate.graphql'

const categories = async ({ operation }) => {
  const res = await apollo.query({
    query: CategoriesQuery,
    variables: { operation: operation ? operation.toUpperCase() : operation }
  })
  return res.data.categories
}

const createCategory = async variables => {
  const res = await apollo.mutate({
    mutation: CategoryCreateMutation,
    variables,
    update: (proxy, { data: { createCategory } }) => {
      try {
        const variables = { operation: createCategory.operation }
        const data = proxy.readQuery({
          query: CategoriesQuery,
          variables
        })

        data.categories = [...data.categories, createCategory]

        proxy.writeQuery({
          query: CategoriesQuery,
          variables,
          data
        })
      } catch (e) {
        console.log('Query "categories" has not been read yet!', e)
      }
    }
  })
  return res.data.createCategory
}

export default {
  categories,
  createCategory
}
