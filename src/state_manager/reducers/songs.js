export const songsReducer = (state = [], action) => {
    switch (action.type) {
        case "FILL_MUSICS":
            return [...action.payload];
        case "ADD_MUSIC":
            return [...action.payload];
        case "UPDATE_SONGS":
            return [...action.payload];
        case "REMOVE_MUSIC":
            return [...action.payload];
        default:
            return state;
    }

}