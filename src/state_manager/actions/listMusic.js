export const setListMusic = musics => {
    return async dispatch => {
        await dispatch({ type: "SET_LIST_MUSIC", payload: musics });
    }
}

export const updateListMusic = id => {
    return async (dispatch, getState) => {
        const currentListMusic = getState().listMusic;

        const musics = currentListMusic.filter((music, index) => index !== id);
       
        await dispatch({ type: "UPDATE_LIST_MUSIC", payload: musics });
    }
}

export const clearListMusic = () => {
    return async dispatch => {
        await dispatch({ type: "CLEAR_LIST_MUSIC", payload: [] });
    }
}