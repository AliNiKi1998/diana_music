export const weeklyPopularMusicReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_WEEKLY_POPULAR_MUSICS":
            return [...action.payload];
        default:
            return state;
    }

}