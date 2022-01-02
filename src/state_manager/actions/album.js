export const setAlbum = album => {
    return async (dispatch) => {
        await dispatch({ type: "SET_ALBUM", payload: album })
    }
}

export const clearAlbum = () => {
    return async (dispatch) => {
        await dispatch({ type: "CLEAR_ALBUM", payload: {} })
    }
}