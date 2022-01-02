export const setLastName = lastName => {
    return async dispatch => {
        await dispatch({ type: "SET_LAST_NAME", payload: lastName })
    }
}

export const changeLastName = lastName => {
    return async dispatch => {
        await dispatch({ type: "CHANGE_LAST_NAME", payload: lastName })
    }
}

export const clearLastName = () => {
    return async dispatch => {
        await dispatch({ type: "CLEAR_LAST_NAME", payload: "" })
    }
}