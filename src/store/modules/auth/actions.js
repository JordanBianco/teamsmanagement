import base from '@/apis/base'
import api from '@/apis/api'
import router from '@/router'

export const login = async ({commit}, {user}) => {
    commit('SET_LOADING_STATUS', true)
    try {
        await base.get('sanctum/csrf-cookie')
        const res = await api.post('login', {
            email: user.email,
            password: user.password,
        })
        if (res.status === 200) {
            commit('SET_LOADING_STATUS', false)
            commit('SET_AUTH_STATE', true)
            router.push({ name: 'Dashboard' })
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
            commit('SET_LOADING_STATUS', false)
        }
    }
}

export const logout = async ({commit}) => {
    try {
        const res = await api.post('logout')
        if (res.status === 200) {
            commit('SET_AUTH_STATE', false)
            commit('SET_USER', null)
            router.push({ name: 'Login' })
        }
    } catch (error) {
        console.log(error)
    }   
}

export const getUser = async ({commit}) => {
    try {
        const res = await api.get('user')
        if (res.status === 200) {
            commit('SET_USER', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const clearErrors = ({commit}) => {
    commit('SET_ERRORS', [])
}