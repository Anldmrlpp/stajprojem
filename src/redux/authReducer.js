const defaultState = {
    isLoggedIn : false,
    id : undefined,
    firstName: undefined,
    lastName: undefined,
    email : undefined,
    password : undefined,
    imageUrl : undefined,
    role: undefined,
    statuses: undefined
}

const authReducer = (state = { ...defaultState }, action) => {
    if (action.type === 'logout-success') {
        return defaultState;
    }
    else if (action.type === 'login-user-success') {
        return {
            ...action.data,
            isLoggedIn: true
        };
    }
    else if (action.type === 'update-user-success') {
        return {
            ...state,
            firstName: action.data.firstName,
            lastName: action.data.lastName,
            imageUrl: action.data.imageUrl
        }
    }
    return state;
};

export default authReducer;