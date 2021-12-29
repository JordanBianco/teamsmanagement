import api from '@/apis/api'
import router from '@/router'

export const getTeams = async ({commit}, {filters}) => {
    try {
        const res = await api.get(
            'admin/teams?search=' + filters.search
            + '&field=' + filters.field
            + '&dir=' + filters.dir
            + '&perPage=' + filters.perPage
        )
        if (res.status === 200) {
            commit('SET_TEAMS', res.data)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const getTeam = async ({commit}, {slug}) => {
    commit('SET_TEAM', null)
    try {
        const res = await api.get('admin/teams/' + slug)
        if (res.status === 200) {
            commit('SET_TEAM', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }   
}

export const storeTeam = async ({commit}, {team}) => {
    try {
        const res = await api.post('admin/teams/', {
            name: team.name,
            color: team.color,
            description: team.description,
        })
        if (res.status === 201) {
            router.push({ name: 'Teams.show', params: { slug: res.data.data.slug }})
        }
    } catch (error) {
        if (error.response.status === 422) {    
            commit('SET_ERRORS', error.response.data.errors)
        }
    }   
}

export const updateTeam = async ({commit}, {team}) => {
    try {
        const res = await api.patch('admin/teams/' + team.id + '/update', {
            name: team.name,
            color: team.color,
            description: team.description,
        })
        if (res.status === 200) {
            router.push({ name: 'Teams.edit', params: {slug: res.data.data.slug} }).catch(() => {})
        }
    } catch (error) {
        if (error.response.status === 422) {    
            commit('SET_ERRORS', error.response.data.errors)
        }
    }   
}

export const deleteTeam = async ({commit}, {id, index}) => {
    try {
        const res = await api.delete('admin/teams/' + id + '/delete')
        if (res.status === 200) {
            if (index) {
                commit('DELETE_TEAM', index)
            }
            else {
                router.push({ name: 'Teams' })
            }
        }
    } catch (error) {
        console.log(error)
    }   
}

export const deleteTeams = async ({commit}, {teams}) => {
    try {
        const res = await api.delete('admin/teams/delete', { params: {ids: teams }})
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
