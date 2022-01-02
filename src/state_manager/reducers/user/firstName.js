export const firstNameReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_FIRST_NAME":
            return action.payload;
        case "CHANGE_FIRST_NAME":
            return action.payload;
        case "CLEAR_FIRST_NAME":
            return action.payload;
        default:
            return state;
    }
}