import apollo from '@/plugins/apollo'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
import CategoriesQuery from './../graphql/Categories.graphql'
import CategoryCreateMutation from './../graphql/CategoryCreate.graphql'

const categories = ({ operation }) => {
  const queryRef = apollo.watchQuery({
    query: CategoriesQuery,
    variables: { operation: operation ? operation.toUpperCase() : operation }
  })
  return from(queryRef)
    .pipe(
      map(res => res.data.categories)
    )
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
