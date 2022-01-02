export const singersReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_SINGERS":
            return [...action.payload];
        case "UPDATE_SINGERS":
            return [...action.payload];
        default:
            return state;
    }

}