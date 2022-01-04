import api from '@/apis/api'

export const getRoles = async ({commit}) => {
    try {
        const res = await api.get('admin/roles')
        if (res.status === 200) {
            commit('SET_ROLES', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const updateRole = async ({dispatch}, {team, user, role_id}) => {
    try {
        const res = await api.patch('admin/roles/teams/' + team.slug + '/role', {
            user_id: user.id,
            role_id: role_id,
        })
        if (res.status === 200) {
            dispatch('teams/getTeam', { slug: team.slug }, {root:true})
        }
    } catch (error) {
        console.log(error)
    }   
}