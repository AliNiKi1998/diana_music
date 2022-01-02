export const setEmail = email => {
    return async dispatch => {
        await dispatch({ type: "SET_EMAIL", payload: email })
    }
}

export const changeEmail = email => {
    return async dispatch => {
        await dispatch({ type: "CHANGE_EMAIL", payload: email })
    }
}