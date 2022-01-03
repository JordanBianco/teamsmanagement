import api from '@/apis/api'
// import router from '@/router'

export const getMembers = async ({commit}, {slug}) => {
    commit('SET_MEMBERS', [])
    try {
        const res = await api.get('admin/teams/' + slug + '/members')
        if (res.status === 200) {
            commit('SET_MEMBERS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const getNotMembers = async ({commit}, {slug}) => {
    commit('SET_NOT_MEMBERS', [])
    try {
        const res = await api.get('admin/teams/' + slug + '/not-members')
        if (res.status === 200) {
            commit('SET_NOT_MEMBERS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const addMember = async ({commit}, {user, team}) => {
    try {
        const res = await api.post('admin/teams/' + team.slug + '/add', {
            user_id: user.id
        })
        if (res.status === 200) {
            commit('PUSH_USER_IN_MEMBERS', user)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const removeMember = async ({commit}, {user, team}) => {
    try {
        const res = await api.delete('admin/teams/' + team.slug + '/remove',  { params: {
                user_id: user.id
            }
        })
        if (res.status === 200) {
            commit('PUSH_USER_IN_NOT_MEMBERS', user)
        }
    } catch (error) {
        console.log(error)
    }   
}