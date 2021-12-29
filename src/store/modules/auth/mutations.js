export const SET_AUTH_STATE = (state, value) => {
    state.isAuth = value
}

export const SET_USER = (state, user) => {
    state.user = user
}

export const SET_ERRORS = (state, errors) => {
    state.errors = errors
}

export const SET_LOADING_STATUS = (state, value) => {
    state.loading = value
}