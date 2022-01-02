export const fillMusics = songs =>{
    return async dispatch =>{
        await dispatch({type:"FILL_MUSICS" , payload: songs})
    }
}

export const updateMusics = id => {
    return async (dispatch, getState) => {
        const currentMusics = getState().songs;

        const musics = currentMusics.filter(music => music.id !== id);

        await dispatch({ type: "UPDATE_SONGS", payload: musics });
    }
}