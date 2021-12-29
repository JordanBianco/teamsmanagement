export const SET_MEMBERS = (state, members) => {
    state.members = members 
}

export const SET_NOT_MEMBERS = (state, notMembers) => {
    state.notMembers = notMembers 
}

export const PUSH_USER_IN_MEMBERS = (state, user) => {
    state.members.push(user)
    state.notMembers.splice(state.notMembers.indexOf(user), 1)
}

export const PUSH_USER_IN_NOT_MEMBERS = (state, user) => {
    state.notMembers.push(user)
    state.members.splice(state.members.indexOf(user), 1)
}