export const SET_MEMBERS = (state, members) => {
    state.members = members 
}

export const SET_NOT_MEMBERS = (state, notMembers) => {
    state.notMembers = notMembers 
}

export const REMOVE_FROM_NOT_MEMBERS = (state, index) => {
    state.notMembers.splice(index, 1)
}

export const REMOVE_FROM_MEMBERS = (state, index) => {
    state.members.splice(index, 1)
}

export const REMOVE_MEMBERS = (state, users) => {
    let indexes = []

    users.filter(member => {
        indexes.push(state.members.indexOf(member))
    })

    for (var i = indexes.length -1; i >= 0; i--) {
        state.members.splice(indexes[i], 1);
    }
}