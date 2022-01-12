import state from '@/store/modules/teamMembers/state'
import * as getters from '@/store/modules/teamMembers/getters'
import * as actions from '@/store/modules/teamMembers/actions'
import * as mutations from '@/store/modules/teamMembers/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}