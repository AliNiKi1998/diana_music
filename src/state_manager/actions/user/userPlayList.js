export const setUserPlayList = playList => {
    return async dispatch => {
        await dispatch({ type: "SET_USER_PLAY_LIST", payload: playList });
    }
}

export const updateUserPlayList = id => {
    return async (dispatch, getState) => {
        const currentUserPlayList = getState().userPlayList;

        const userPlayList = currentUserPlayList.filter((playList, index) => playList.id !== id);
       
        await dispatch({ type: "UPDATE_USER_PLAY_LIST", payload: userPlayList });
    }
}

export const clearUserPlayList = () => {
    return async dispatch => {
        await dispatch({ type: "CLEAR_USER_PLAY_LIST", payload: [] });
    }
}