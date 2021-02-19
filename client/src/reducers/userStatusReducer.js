const userStatusReducer = (state = false, action) => {
    console.log("getting user status");
    console.log('action :>> ', action);
    console.log('state :>> ', state);
    switch(action.type) {
        case "LOGIN":
            return true

        case "LOGOUT":
            return false

        default:
            return state;
    }
}

export const userTypeReducer = (state = "USER", action) => {
    console.log("getting user type");
    console.log('action :>> ', action);
    console.log('state :>> ', state);
    switch(action.type) {
        case "USER":
            return "USER"

        case "COUNSELOR":
            return "COUNSELOR"

        default:
            return state;
    }
}

export default userStatusReducer;