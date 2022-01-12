export const tasks = (state) => {
    return state.tasks
}

export const task = (state) => {
    return state.task
}

export const pending = (state) => {
    return state.tasks.filter(t => {
        return t.status === 'pending'
    })
}

export const progress = (state) => {
    return state.tasks.filter(t => {
        return t.status === 'in progress'
    })
}

export const completed = (state) => {
    return state.tasks.filter(t => {
        return t.status === 'completed'
    })
}

export const errors = (state) => {
    return state.errors
}

export const success = (state) => {
    return state.success
}