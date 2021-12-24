import api from '@/apis/api'
// import router from '@/router'

export const getUsers = async ({commit}, {filters}) => {
    try {
        const res = await api.get(
            'admin/users?search=' + filters.search
            + '&admin=' + filters.admin
            + '&perPage=' + filters.perPage
            + '&field=' + filters.field
            + '&dir=' + filters.dir
        )
        if (res.status === 200) {
            commit('SET_USERS', res.data)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const getUser = async ({commit}, {slug}) => {
    try {
        const res = await api.get('admin/users/' + slug)
        if (res.status === 200) {
            commit('SET_USER', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }   
}

// export const clearErrors = ({commit}) => {
//     commit('SET_ERRORS', [])
// }

// if (error.response.status === 422) {
//     commit('SET_ERRORS', error.response.data.errors)
// }
