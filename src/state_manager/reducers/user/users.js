export const usersReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_USERS":
            return [...action.payload];
        case "UPDATE_USERS":
            return [...action.payload];
        default:
            return state;
    }

}