import api from '@/apis/api'
import router from '@/router'

export const getUsers = async ({commit}, {filters, page}) => {
    try {
        const res = await api.get(
            'admin/users?search=' + filters.search
            + '&role=' + filters.role
            + '&team=' + filters.team
            + '&field=' + filters.field
            + '&dir=' + filters.dir
            + '&perPage=' + filters.perPage
            + '&page=' + page
        )
        if (res.status === 200) {
            commit('SET_USERS', res.data)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const getAllTeams = async ({commit}) => {
    try {
        const res = await api.get('admin/users/teams')
        if (res.status === 200) {
            commit('SET_TEAMS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const getUser = async ({commit}, {slug}) => {
    commit('SET_USER', null)
    try {
        const res = await api.get('admin/users/' + slug)
        if (res.status === 200) {
            commit('SET_USER', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const updateUser = async ({commit}, {user}) => {
    try {
        const res = await api.patch('admin/users/' + user.id + '/update', {
            id: user.id,
            name: user.name,
            email: user.email,
            birth_date: user.birth_date,
            phone_number: user.phone_number,
            gender: user.gender,
        })
        if (res.status === 200) {
            router.push({ name: 'Users.edit', params: {slug: res.data.data.slug} }).catch(() => {})
        }
    } catch (error) {
        if (error.response.status === 422) {    
            commit('SET_ERRORS', error.response.data.errors)
        }
    }   
}

export const deleteUser = async ({commit}, {id, index}) => {
    try {
        const res = await api.delete('admin/users/' + id + '/delete')
        if (res.status === 200) {
            if (index) {
                commit('DELETE_USER', index)
            }
            else {
                router.push({ name: 'Users' })
            }
        }
    } catch (error) {
        console.log(error)
    }   
}

export const deleteUsers = async ({commit}, {users}) => {
    try {
        const res = await api.delete('admin/users/delete', { params: {ids: users }})
        if (res.status === 200) {
            commit('SET_SUCCESS_STATUS', true)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const clearErrors = ({commit}) => {
    commit('SET_ERRORS', [])
}

export const setSuccessStatus = ({commit}, {value}) => {
    commit('SET_SUCCESS_STATUS', value)
}
