export const albumsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ALBUMS":
            return [...action.payload];
        case "ADD_TO_ALBUMS":
            return [...action.payload];
        case "UPDATE_ALBUMS":
            return [...action.payload];
        default:
            return state;
    }

}