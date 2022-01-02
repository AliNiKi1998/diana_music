export const setWeeklyPopularMusic = songs =>{
    return async dispatch =>{
        await dispatch({type:"SET_WEEKLY_POPULAR_MUSICS" , payload: songs})
    }
}