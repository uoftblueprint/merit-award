const userStatusReducer = (state = [], action) => {
    switch(action.type) {
        case "SIGNUP_USER":
            return [
                ...state,
                action.payload
            ];
        case "DELETE_USER":
            return state.filter(user => user.username !== action.payload.username);
        default:
            return state;
    }
}

export default userStatusReducer;
