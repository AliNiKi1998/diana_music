export const albumReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_ALBUM":
            return { ...action.payload }
        case "UPDATE_ALBUM":
            return { ...action.payload }
        case "CLEAR_ALBUM":
            return { ...action.payload }
        default:
            return state;
    }
}