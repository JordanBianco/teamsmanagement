export const SET_PROJECTS = (state, projects) => {
    state.projects = projects 
}

export const SET_PROJECT = (state, project) => {
    state.project = project 
}

export const DELETE_PROJECT = (state, index) => {
    state.projects.splice(index, 1) 
}

export const DELETE_PROJECTS = (state, projects) => {
    let indexes = []

    projects.filter(project => {
        indexes.push(state.projects.indexOf(project))
    })

    for (var i = indexes.length -1; i >= 0; i--) {
        state.projects.splice(indexes[i], 1);
    }
}

export const SET_ERRORS = (state, errors) => {
    state.errors = errors 
}