import { userConstants } from "../Actions/constants";



const initialState = {
    message: "",
    loading: false,
    authenticate: false,
    authenticating: false,
    access_token: null,
    errors: "",
    user: null,
    status:false
}
export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case userConstants.USER_LOGIN_REQUEST:
            state = {
                ...state,
                loading: true,
                authenticating: true
            }
            break;
        case userConstants.USER_LOGIN_SUCCESS:
            state = {
                ...state,
                access_token: action.payload.access_token,
                user: action.payload.user,
                message:action.payload.message,
                loading: false,
                authenticate: true,
                authenticating: false,
                status:true
            }
            break;
        case userConstants.USER_LOGIN_FAILURE:
            state = {
                ...state,
                loading: false,
                status:false,
                message:action.payload.message,
                authenticating: false,
                error: action.payload.error,
                user:null
            }
            break;
        case userConstants.USER_LOGOUT_REQUEST:
            state = {
                ...state
            }
            break;
        case userConstants.USER_LOGOUT_SUCCESS:
            state = initialState
            break;

    }
    return state;
}