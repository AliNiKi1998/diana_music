export const setFirstName = firstName => {
    return async dispatch => {
        await dispatch({ type: "SET_FIRST_NAME", payload: firstName })
    }
}

export const changeFirstName = firstName => {
    return async dispatch => {
        await dispatch({ type: "CHANGE_FIRST_NAME", payload: firstName })
    }
}

export const clearFirstName = () => {
    return async dispatch => {
        await dispatch({ type: "CLEAR_FIRST_NAME", payload: "" })
    }
}