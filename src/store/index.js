import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

import auth from '@/store/modules/auth'
import users from '@/store/modules/users'
import teams from '@/store/modules/teams'
import teamUser from '@/store/modules/teamUser'
import projects from '@/store/modules/projects'
import roles from '@/store/modules/roles'

const data = createPersistedState({
	paths: ['auth']
})

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		auth,
		users,
		teams,
		teamUser,
		projects,
		roles
	},
	plugins: [data]
})
