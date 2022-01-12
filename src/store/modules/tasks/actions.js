import api from '@/apis/api'

export const getTasks = async ({commit}, {slug, filters}) => {
    commit('SET_TASKS', [])
    try {
        const res = await api.get('admin/projects/' + slug + '/tasks?uncompleted=' + filters.uncompleted)
        if (res.status === 200) {
            commit('SET_TASKS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getTask = async ({commit}, {slug, id}) => {
    commit('SET_TASK', null)
    try {
        const res = await api.get('admin/projects/' + slug + '/tasks/' + id)
        if (res.status === 200) {
            commit('SET_TASK', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const storeTask = async ({commit}, {task, project}) => {
    try {
        const res = await api.post('admin/projects/' + project.slug + '/tasks', {
            assigned_to: task.assigned_to,
            name: task.name,
            description: task.description,
            due_date: task.due_date,
        })
        if (res.status === 201) {
            commit('STORE_TASK', res.data.data)
            commit('SET_SUCCESS_STATUS', true)
        }
    } catch (error) {
        if (error.response.status === 422) {    
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const updateTask = async ({commit}, {slug, task}) => {
    try {
        const res = await api.patch('admin/projects/' + slug + '/tasks/' + task.id + '/update', {
            assigned_to: task.assigned_to,
            name: task.name,
            description: task.description,
            status: task.status,
            due_date: task.due_date,
        })
        if (res.status === 200) {
            commit('SET_SUCCESS_STATUS', true)

            commit('notifications/ADD_NOTIFICATION', {
                message: 'Task aggiornata'
            }, { root:true });
        }
    } catch (error) {
        if (error.response.status === 422) {    
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const deleteTask = async ({commit}, {project, task, index}) => {
    try {
        const res = await api.delete('admin/projects/' + project.slug + '/tasks/' + task.id + '/delete')
        if (res.status === 200) {
            commit('DELETE_TASK', index)

            commit('notifications/ADD_NOTIFICATION', {
                message: 'Task eliminata'
            }, { root:true });
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteTasks = async ({commit}, {project, tasks}) => {
    let ids = []
    tasks.filter(task => { ids.push(task.id) })
    
    try {
        const res = await api.delete('admin/projects/' + project.slug + '/tasks/delete', { params: {
            ids: ids
        }})
        if (res.status === 200) {
            commit('DELETE_TASKS', tasks)

            commit('notifications/ADD_NOTIFICATION', {
                message: 'Tasks eliminate'
            }, { root:true });
        }
    } catch (error) {
        console.log(error)
    }
}

export const clearErrors = ({commit}) => {
    commit('SET_ERRORS', [])
}

export const setSuccessStatus = ({commit}, value) => {
    commit('SET_SUCCESS_STATUS', value)
}