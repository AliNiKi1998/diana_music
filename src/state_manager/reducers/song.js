export const songReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_MUSIC":
            return { ...action.payload }
        case "NEXT_MUSIC":
            return { ...action.payload }
        case "PREV_MUSIC":
            return { ...action.payload }
        case "RANDOM_MUSIC":
            return { ...action.payload }
        default:
            return state;
    }
}