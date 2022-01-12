export const SET_TASKS = (state, tasks) => {
    state.tasks = tasks 
}

export const SET_TASK = (state, task) => {
    state.task = task 
}

export const STORE_TASK = (state, task) => {
    state.tasks.push(task) 
}

export const DELETE_TASK = (state, index) => {
    state.tasks.splice(index, 1) 
}

export const DELETE_TASKS = (state, tasks) => {
    let indexes = []

    tasks.filter(task => {
        indexes.push(state.tasks.indexOf(task))
    })

    for (var i = indexes.length -1; i >= 0; i--) {
        state.tasks.splice(indexes[i], 1);
    }
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}

export const SET_ERRORS = (state, errors) => {
    state.errors = errors 
}