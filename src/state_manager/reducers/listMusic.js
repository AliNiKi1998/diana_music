export const listMusicReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_LIST_MUSIC":
            return [...action.payload]
        case "UPDATE_LIST_MUSIC":
            return [...action.payload]
        case "CLEAR_LIST_MUSIC":
            return [...action.payload]
        default:
            return state;
    }
}