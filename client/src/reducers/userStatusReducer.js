const userStatusReducer = (state = false, action) => {
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
    switch(action.type) {
        case "USER":
            return "USER"

        case "COUNSELOR":
            return "COUNSELOR"

        case "REVIEWER":
            return "REVIEWER"

        case "RECOMMENDER":
            return "RECOMMENDER"

        case "ADMIN":
            return "ADMIN"

        default:
            return state;
    }
}

export default userStatusReducer;