import state from '@/store/modules/teams/state'
import * as getters from '@/store/modules/teams/getters'
import * as actions from '@/store/modules/teams/actions'
import * as mutations from '@/store/modules/teams/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}