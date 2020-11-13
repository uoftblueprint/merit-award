export const signUpUser = (user) => {
    return {
        type: 'SIGNUP_USER',
        payload: user
    }
}

export const deleteUser = (user) => {
    return {
        type: 'DELETE_USER',
        payload: user
    }
}
