export const setUsers = users => {
    return async dispatch => {
        await dispatch({ type: "SET_USERS", payload: users });
    }
}

export const updateUsers = id => {
    return async (dispatch, getState) => {
        const currentUsers = getState().users;

        const users = currentUsers.filter((user, index) => user.id !== id);
       
        await dispatch({ type: "UPDATE_USERS", payload: users });
    }
}