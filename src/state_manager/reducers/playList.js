export const playListReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_PLAY_LIST":
            return [...action.payload]
        case "UPDATE_PLAY_LIST":
            return [...action.payload]
        case "CLEAR_PLAY_LIST":
            return [...action.payload]
        default:
            return state;
    }
}