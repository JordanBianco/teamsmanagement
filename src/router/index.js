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
				component: () => import(/* webpackChunkName: "index" */ '../views/Dashboard/Index.vue'),
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
				path: 'teams',
				name: 'Teams',
				component: () => import(/* webpackChunkName: "teams" */ '../views/Dashboard/Teams.vue'),
				meta: { auth: true }
			}
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
