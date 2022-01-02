export const setConfirmPassword = confirmPassword => {
    return async dispatch => {
        await dispatch({ type: "SET_CONFIRM_PASSWORD", payload: confirmPassword })
    }
}

export const changeConfirmPassword = confirmPassword => {
    return async dispatch => {
        await dispatch({ type: "CHANGE_CONFIRM_PASSWORD", payload: confirmPassword })
    }
}

export const clearConfirmPassword = () => {
    return async dispatch => {
        await dispatch({ type: "CLEAR_CONFIRM_PASSWORD", payload: "" })
    }
}