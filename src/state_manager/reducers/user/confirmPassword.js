export const confirmPasswordReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_CONFIRM_PASSWORD":
            return action.payload;
        case "CLEAR_CONFIRM_PASSWORD":
            return action.payload;
        default:
            return state;
    }
}