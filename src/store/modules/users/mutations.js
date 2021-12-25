export const SET_USERS = (state, users) => {
    state.users = users 
}

export const SET_USER = (state, user) => {
    state.user = user
}

export const DELETE_USER = (state, index) => {
    state.users.data.splice(index, 1)
}

export const SET_ERRORS = (state, errors) => {
    state.errors = errors
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}