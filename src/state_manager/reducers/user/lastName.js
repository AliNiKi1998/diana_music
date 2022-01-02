export const lastNameReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_LAST_NAME":
            return action.payload;
        case "CHANGE_LAST_NAME":
            return action.payload;
        case "CLEAR_LAST_NAME":
            return action.payload;
        default:
            return state;
    }
}