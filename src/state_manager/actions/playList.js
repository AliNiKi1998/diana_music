export const setPlayList = musics => {
    return async dispatch => {
        await dispatch({ type: "SET_PLAY_LIST", payload: musics });
    }
}

export const updatePlayList = id => {
    return async (dispatch, getState) => {
        const currentPlayList = getState().playList;

        const musics = currentPlayList.filter((music, index) => index !== id);
       
        await dispatch({ type: "UPDATE_PLAY_LIST", payload: musics });
    }
}

export const clearPlayList = () => {
    return async dispatch => {
        await dispatch({ type: "CLEAR_PLAY_LIST", payload: [] });
    }
}