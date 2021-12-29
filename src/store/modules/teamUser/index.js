import state from '@/store/modules/teamUser/state'
import * as getters from '@/store/modules/teamUser/getters'
import * as actions from '@/store/modules/teamUser/actions'
import * as mutations from '@/store/modules/teamUser/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}