export const addAlbumDialogReducer = (state = false, action) => {
    switch (action.type) {
        case "OPEN_ADD_ALBUM_DIALOG":
            return action.payload;
        case "CLOSE_ADD_ALBUM_DIALOG":
            return action.payload;
        default:
            return state;
    }
}