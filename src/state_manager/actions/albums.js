export const setAlbums = albums => {
    return async dispatch => {
        await dispatch({ type: "SET_ALBUMS", payload: albums });
    }
}

export const addToAlbums = album => {
    return async (dispatch, getState) => {
        let currentAlbums = getState().albums;
        let albums = currentAlbums.push(album);
        await dispatch({ type: "ADD_TO_ALBUMS", payload: albums });
    }
}

export const updateAlbums = id => {
    return async (dispatch, getState) => {
        const currentAlbum = getState().albums;

        const albums = currentAlbum.filter(album => album.id !== id);

        await dispatch({ type: "UPDATE_ALBUMS", payload: albums });
    }
}