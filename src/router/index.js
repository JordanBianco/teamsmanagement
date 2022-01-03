import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
		meta: { guest: true }
	},
	{
		path: '/dashboard',
		component: () => import(/* webpackChunkName: "layout" */ '../views/Dashboard/Layout.vue'),
		meta: { auth: true },
		children: [
			{
				path: '',
				name: 'Dashboard',
				component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/Dashboard.vue'),
				meta: { auth: true }
			},
			{
				path: 'utenti',
				name: 'Users',
				component: () => import(/* webpackChunkName: "users" */ '../views/Dashboard/Users/Index.vue'),
				meta: { auth: true },
			},
			{
				path: 'utenti/:slug',
				name: 'Users.show',
				component: () => import(/* webpackChunkName: "usersShow" */ '../views/Dashboard/Users/Show.vue'),
				props: true,
				meta: { auth: true }
			},
			{
				path: 'utenti/:slug/edit',
				name: 'Users.edit',
				component: () => import(/* webpackChunkName: "usersEdit" */ '../views/Dashboard/Users/Edit.vue'),
				props: true,
				meta: { auth: true }
			},
			{
				path: 'teams',
				name: 'Teams',
				component: () => import(/* webpackChunkName: "teams" */ '../views/Dashboard/Teams/Index.vue'),
				meta: { auth: true }
			},
			{
				path: 'teams/create',
				name: 'Teams.create',
				component: () => import(/* webpackChunkName: "teamsCreate" */ '../views/Dashboard/Teams/Create.vue'),
				meta: { auth: true }
			},
			{
				path: 'teams/:slug/members',
				name: 'Teams.members',
				component: () => import(/* webpackChunkName: "teamsMembers" */ '../views/Dashboard/Teams/Members.vue'),
				props: true,
				meta: { auth: true }
			},
			{
				path: 'team/:slug',
				name: 'Teams.show',
				component: () => import(/* webpackChunkName: "teamsShow" */ '../views/Dashboard/Teams/Show.vue'),
				props: true,
				meta: { auth: true }
			},
			{
				path: 'teams/:slug/edit',
				name: 'Teams.edit',
				component: () => import(/* webpackChunkName: "teamsEdit" */ '../views/Dashboard/Teams/Edit.vue'),
				props: true,
				meta: { auth: true }
			},
			{
				path: 'teams/:slug/projects',
				name: 'Projects',
				component: () => import(/* webpackChunkName: "projects" */ '../views/Dashboard/Teams/Projects/Index.vue'),
				props: true,
				meta: { auth: true }
			},
			{
				path: 'teams/:tslug/projects/:pslug',
				name: 'Projects.show',
				component: () => import(/* webpackChunkName: "projects" */ '../views/Dashboard/Teams/Projects/Show.vue'),
				props: true,
				meta: { auth: true }
			},
			{
				path: 'roles',
				name: 'Roles',
				component: () => import(/* webpackChunkName: "roles" */ '../views/Dashboard/Roles/index.vue'),
				meta: { auth: true }
			},
		]
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.auth)) {
		if (!store.state.auth.isAuth) {
			next({ name: 'Login'})
		} else {
			next()
		}
	} else if (to.matched.some(record => record.meta.guest)) {
		if (store.state.auth.isAuth) {
			next({ name: 'Dashboard'})
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
