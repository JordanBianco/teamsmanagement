import state from '@/store/modules/notifications/state'
import * as getters from '@/store/modules/notifications/getters'
import * as actions from '@/store/modules/notifications/actions'
import * as mutations from '@/store/modules/notifications/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}