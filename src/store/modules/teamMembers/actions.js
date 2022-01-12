import api from '@/apis/api'

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

export const getNotMembers = async ({commit}, {slug, filters}) => {
    commit('SET_NOT_MEMBERS', [])
    try {
        const res = await api.get('admin/teams/' + slug + '/not-members?search=' + filters.search)
        if (res.status === 200) {
            commit('SET_NOT_MEMBERS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const addMember = async ({commit}, {user, index, team}) => {
    try {
        const res = await api.post('admin/teams/' + team.slug + '/add', {
            user_id: user.id
        })
        if (res.status === 200) {
            commit('REMOVE_FROM_NOT_MEMBERS', index)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const removeMember = async ({commit}, {user, index ,team}) => {
    try {
        const res = await api.delete('admin/teams/' + team.slug + '/remove',  { params: {
                user_id: user.id
            }
        })
        if (res.status === 200) {
            commit('REMOVE_FROM_MEMBERS', index)

            commit('notifications/ADD_NOTIFICATION', {
                message: 'Utente rimosso dal team'
            }, { root:true });
        }
    } catch (error) {
        console.log(error)
    }   
}

export const removeMembers = async ({commit}, {team, users}) => {
    let ids = []
    users.filter(user => { ids.push(user.id) })
    try {
        const res = await api.delete('admin/teams/' + team.slug + '/remove-users',  { params: {
            ids: ids
        }})
        if (res.status === 200) {
            commit('REMOVE_MEMBERS', users)

            commit('notifications/ADD_NOTIFICATION', {
                message: 'Utenti rimossi dal team'
            }, { root:true });
        }
    } catch (error) {
        console.log(error)
    }   
}