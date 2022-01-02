export const avatarReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_AVATAR":
            return action.payload;
        case "CHANGE_AVATAR":
            return action.payload;
        case "CLEAR_AVATAR":
            return action.payload;
        default:
            return state;
    }
}