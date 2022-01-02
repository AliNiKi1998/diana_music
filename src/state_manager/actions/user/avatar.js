export const setAvatar = avatar => {
    return async dispatch => {
        if (avatar)
            await dispatch({ type: "SET_AVATAR", payload: avatar });
    }
}

export const changeAvatar = avatar => {
    return async dispatch => {
        if (avatar)
            await dispatch({ type: "CHANGE_AVATAR", payload: avatar });
    }
}

export const clearAvatar = () => {
    return async dispatch => {
        await dispatch({ type: "CLEAR_AVATAR", payload: {} });
    }
}