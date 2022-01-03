import api from '@/apis/api'
// import router from '@/router'

export const getProjects = async ({commit}, {slug}) => {
    try {
        const res = await api.get('admin/teams/' + slug + '/projects')
        if (res.status === 200) {
            commit('SET_PROJECTS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }   
}