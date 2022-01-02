export const setMusic = music => {
    return async (dispatch) => {
        await dispatch({ type: "SET_MUSIC", payload: music })
    }
}
export const nextMusic = () => {
    return async (dispatch) => {
        await dispatch({ type: "NEXT_MUSIC", payload: "music" })
    }
}

export const randomMusic = songs => {

    let song = songs[Math.floor(Math.random() * songs.length)];

    return async (dispatch) => {
        await dispatch({ type: "RANDOM_MUSIC", payload: song })
    }
}