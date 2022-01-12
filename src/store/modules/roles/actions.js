import api from '@/apis/api'
import router from '@/router'

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

export const updateRole = async ({commit}, {team, user, role_id}) => {
    try {
        const res = await api.patch('admin/roles/teams/' + team.slug + '/role', {
            user_id: user.id,
            role_id: role_id,
        })
        if (res.status === 200) {
            router.push({ 
                name: 'Teams.roles', 
                params: { slug: team.slug }
            }).catch(() => {})

            commit('notifications/ADD_NOTIFICATION', {
                message: 'Ruolo aggiornato'
            }, { root:true });
        }
    } catch (error) {
        console.log(error)
    }   
}