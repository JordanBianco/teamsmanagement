import api from '@/apis/api'
import router from '@/router'

export const getProjects = async ({commit}, {slug, filters}) => {
    try {
        const res = await api.get(
            'admin/teams/' + slug + '/projects?search=' + filters.search
            + '&field=' + filters.field
            + '&dir=' + filters.dir
        )
        if (res.status === 200) {
            commit('SET_PROJECTS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getProject = async ({commit}, {tslug, pslug}) => {
    commit('SET_PROJECT', null)
    try {
        const res = await api.get('admin/teams/' + tslug + '/projects/' + pslug)
        if (res.status === 200) {
            commit('SET_PROJECT', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const storeProject = async ({commit}, {user_id, team, project}) => {
    try {
        const res = await api.post('admin/teams/' + team.slug + '/projects', {
            user_id: user_id,
            name: project.name,
            description: project.description,
            end_date: project.end_date,
        })
        if (res.status === 201) {
            router.push({ name: 'Projects.show', params: { 
                tslug: team.slug,
                pslug: res.data.data.slug
            }})
        }
    } catch (error) {
        if (error.response.status === 422) {    
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const updateProject = async ({commit}, {project}) => {
    try {
        const res = await api.patch('admin/teams/' + project.team.slug + '/projects/' + project.slug, {
            user_id: project.user_id,
            name: project.name,
            description: project.description,
            end_date: project.end_date,
        })
        if (res.status === 200) {
            router.push({ name: 'Projects.edit', params: { 
                tslug: project.team.slug,
                pslug: res.data.data.slug
            }})
            .catch(() => {})
        }
    } catch (error) {
        if (error.response.status === 422) {    
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const deleteProject = async ({commit}, {team, project, index}) => {
    try {
        const res = await api.delete('admin/teams/' + team.slug + '/projects/' + project.slug + '/delete')
        if (res.status === 200) {
            if (index != undefined) {
                commit('DELETE_PROJECT', index)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const clearErrors = ({commit}) => {
    commit('SET_ERRORS', [])
}