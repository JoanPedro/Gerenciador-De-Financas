import actions from './actions'
import mutations from './mutations'

const state = {
  filters: undefined,
  isFiltering: false,
  month: undefined
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}