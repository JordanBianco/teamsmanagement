import state from '@/store/modules/tasks/state'
import * as getters from '@/store/modules/tasks/getters'
import * as actions from '@/store/modules/tasks/actions'
import * as mutations from '@/store/modules/tasks/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}