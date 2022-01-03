import state from '@/store/modules/projects/state'
import * as getters from '@/store/modules/projects/getters'
import * as actions from '@/store/modules/projects/actions'
import * as mutations from '@/store/modules/projects/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}