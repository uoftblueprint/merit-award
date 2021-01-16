const userStatusReducer = (state = false, action) => {
    switch(action.type) {
        case "LOGIN":
            return true;

        case "LOGOUT":
            return false;

        default:
            return false;
    }
}

export default userStatusReducer;