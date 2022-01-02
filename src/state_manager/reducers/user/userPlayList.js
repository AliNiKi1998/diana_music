export const userPlayListReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_USER_PLAY_LIST":
            return [...action.payload]
        case "UPDATE_USER_PLAY_LIST":
            return [...action.payload]
        case "CLEAR_USER_PLAY_LIST":
            return [...action.payload]
        default:
            return state;
    }
}