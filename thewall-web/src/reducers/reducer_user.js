import {
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    REGISTER_USER,
    AUTH_USER,
    AUTH_USER_FAILURE,
    AUTH_USER_SUCCESS,
    REFRESH_AUTH,
    REMOVE_AUTH,
    GET_USER_INFO,
    GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE, REFRESH_AUTH_SUCCESS, REFRESH_AUTH_FAILURE,
    REFRESH_AUTH_TIMER_SET,
} from "../actions/user";

const INITIAL_STATE = {
    error: null,
    loading: false,
    isAuthed: false,
    userData: {userId: null, userName: null, email: null},
    authToken: null,
    refreshToken: null,
    refreshTimerID: null,
    expiresIn: null,
    };

export default (state = INITIAL_STATE,action) => {
    switch(action.type){
        case AUTH_USER:
            return {...state,loading: true, error: null};

        case AUTH_USER_SUCCESS:
            return {...state,error: null, loading: false, authToken: action.payload['access_token'],refreshToken: action.payload['refresh_token'],
                isAuthed: true, expiresIn: action.payload['expires_in'],
                userData: {userId: action.payload['user_data']['id'], userName: action.payload['user_data']['username'], email: action.payload['user_data']['email']}

            };

        case AUTH_USER_FAILURE:
            return {...state, loading: false, authToken: null, refreshToken: null, isAuthed: false, error: action.payload};

        case REGISTER_USER:
            return {...state, loading: true, error: null, isAuthed: false};

        case REGISTER_USER_SUCCESS:
            return {...state,loading:false,error:null};

        case REGISTER_USER_FAILURE:
            return {...state, loading: false, error: action.payload};

        case GET_USER_INFO:
            return{...state,loading: true,error: null};

        case GET_USER_INFO_SUCCESS:
            return{...state,error: null, userData: {userId: action.payload['id'], userName: action.payload['username'],email: action.payload['email']}};

        case GET_USER_INFO_FAILURE:
            return {...state,error: action.payload};

        case REFRESH_AUTH:
            return {...state, loading: false, error: null};

        case REFRESH_AUTH_SUCCESS:
            return {...state,loading: false, isAuthed: true, authToken: action.payload['access_token'],
                refreshToken: action.payload['refresh_token'],expiresIn: action.payload['expires_in']};

        case REFRESH_AUTH_FAILURE:
            return {...state, loading: false, isAuthed: false, authToken: null, refreshToken: null, expiresIn: null, error: action.payload};

        case REMOVE_AUTH:
            return {...state, isAuthed: false, userData: {userId: null, userName: null, email: null},authToken: null, refreshToken: null,expiresIn: null, refreshTimerID: null};

        case REFRESH_AUTH_TIMER_SET:
            return {...state, refreshTimerID: action.payload}


        default:
            return state;
    }
}