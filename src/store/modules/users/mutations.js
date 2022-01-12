export const SET_USERS = (state, users) => {
    state.users = users 
}

export const SET_USER = (state, user) => {
    state.user = user
}

export const SET_TEAMS = (state, teams) => {
    state.teams = teams 
}

export const DELETE_USER = (state, index) => {
    state.users.data.splice(index, 1)
}

export const DELETE_USERS = (state, users) => {
    let indexes = []

    users.filter(user => {
        indexes.push(state.users.data.indexOf(user))
    })

    for (var i = indexes.length -1; i >= 0; i--) {
        state.users.data.splice(indexes[i], 1);
    }
}

export const SET_ERRORS = (state, errors) => {
    state.errors = errors
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}