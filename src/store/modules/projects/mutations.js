export const SET_PROJECTS = (state, projects) => {
    state.projects = projects 
}

export const SET_PROJECT = (state, project) => {
    state.project = project 
}

export const DELETE_PROJECT = (state, index) => {
    state.projects.splice(index, 1) 
}

export const SET_ERRORS = (state, errors) => {
    state.errors = errors 
}