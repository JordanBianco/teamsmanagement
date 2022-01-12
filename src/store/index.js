import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

import auth from '@/store/modules/auth'
import users from '@/store/modules/users'
import teams from '@/store/modules/teams'
import teamMembers from '@/store/modules/teamMembers'
import projects from '@/store/modules/projects'
import roles from '@/store/modules/roles'
import tasks from '@/store/modules/tasks'
import notifications from '@/store/modules/notifications'

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
		teamMembers,
		projects,
		roles,
		tasks,
		notifications
	},
	plugins: [data]
})
