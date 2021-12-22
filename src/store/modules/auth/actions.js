import base from '@/apis/base'
import router from '@/router'

export const login = async ({commit}, {user}) => {
    try {
        await base.get('sanctum/csrf-cookie')
        const res = await base.post('login', {
            email: user.email,
            password: user.password,
        })
        if (res.status === 200) {
            commit('SET_AUTH_STATE', true)
            router.push({ name: 'Dashboard' })
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)            
        }
    }   
}