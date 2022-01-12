export const SET_TEAMS = (state, teams) => {
    state.teams = teams 
}

export const SET_TEAM = (state, team) => {
    state.team = team
}

export const DELETE_TEAM = (state, index) => {
    state.teams.data.splice(index, 1)
}

export const DELETE_TEAMS = (state, teams) => {
    let indexes = []

    teams.filter(team => {
        indexes.push(state.teams.data.indexOf(team))
    })

    for (var i = indexes.length -1; i >= 0; i--) {
        state.teams.data.splice(indexes[i], 1);
    }
}

export const SET_ERRORS = (state, errors) => {
    state.errors = errors
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}