export const editAlbumDialogReducer = (state = false, action) => {
    switch (action.type) {
        case "OPEN_EDIT_ALBUM_DIALOG":
            return action.payload;
        case "CLOSE_EDIT_ALBUM_DIALOG":
            return action.payload;
        default:
            return state;
    }
}