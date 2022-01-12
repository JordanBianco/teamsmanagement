export const ADD_NOTIFICATION = (state, {message}) => {
    state.notifications.push({ message });
}

export const REMOVE_NOTIFICATION = (state, index) => {
    state.notifications.splice(index, 1);
}