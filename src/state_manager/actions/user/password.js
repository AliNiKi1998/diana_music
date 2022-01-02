export const setPassword = password => {
    return async dispatch => {
        await dispatch({ type: "SET_PASSWORD", payload: password });
    }
}

export const changePassword = password => {
    return async dispatch => {
        await dispatch({ type: "CHANGE_PASSWORD", payload: password });
    }
}