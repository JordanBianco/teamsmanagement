import state from '@/store/modules/roles/state'
import * as getters from '@/store/modules/roles/getters'
import * as actions from '@/store/modules/roles/actions'
import * as mutations from '@/store/modules/roles/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}