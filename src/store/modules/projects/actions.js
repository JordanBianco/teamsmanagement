import api from '@/apis/api'
import router from '@/router'

export const getProjects = async ({commit}, {slug}) => {
    commit('SET_PROJECTS', [])
    try {
        const res = await api.get('admin/teams/' + slug + '/projects')
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

            commit('notifications/ADD_NOTIFICATION', {
                message: 'Progetto aggiornato'
            }, { root:true });
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

                commit('notifications/ADD_NOTIFICATION', {
                    message: 'Progetto eliminato'
                }, { root:true });
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteProjects = async ({commit}, {team, projects}) => {
    let ids = []
    projects.filter(project => { ids.push(project.id) })

    try {
        const res = await api.delete('admin/teams/' + team.slug + '/projects/delete', { params: {
            ids: ids
        }})
        if (res.status === 200) {
            commit('DELETE_PROJECTS', projects)

            commit('notifications/ADD_NOTIFICATION', {
                message: 'Progetti eliminati'
            }, { root:true });
        }
    } catch (error) {
        console.log(error)
    }
}

export const clearErrors = ({commit}) => {
    commit('SET_ERRORS', [])
}