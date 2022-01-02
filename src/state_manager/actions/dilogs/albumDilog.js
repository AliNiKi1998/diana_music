export const openAddAlbumDialog = () => {
    return async dispatch => {
        await dispatch({ type: "OPEN_ADD_ALBUM_DIALOG", payload: true });
    }
}
export const closeAddAlbumDialog = () => {
    return async dispatch => {
        await dispatch({ type: "CLOSE_ADD_ALBUM_DIALOG", payload: false });
    }
}
export const openEditAlbumDialog = () => {
    return async dispatch => {
        await dispatch({ type: "OPEN_EDIT_ALBUM_DIALOG", payload: true });
    }
}
export const closeEditAlbumDialog = () => {
    return async dispatch => {
        await dispatch({ type: "CLOSE_EDIT_ALBUM_DIALOG", payload: false });
    }
}
