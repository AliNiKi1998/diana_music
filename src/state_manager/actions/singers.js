export const setSingers = singers =>{
    return async dispatch =>{
        await dispatch({type:"SET_SINGERS" , payload: singers})
    }
}


export const updateSingers = id => {
    return async (dispatch, getState) => {
        const currentSingers = getState().singers;

        const singers = currentSingers.filter(singer => singer.id !== id);

        await dispatch({ type: "UPDATE_SINGERS", payload: singers });
    }
}