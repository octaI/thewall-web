import axios from 'axios'
import '../config'
import {ROOT_URL} from "../config";

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const AUTH_USER = 'AUTH_USER';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';

export const REFRESH_AUTH = 'REFRESH_AUTH';
export const REFRESH_AUTH_SUCCESS = 'REFRESH_AUTH_SUCCESS';
export const REFRESH_AUTH_FAILURE = 'REFRESH_AUTH_FAILURE';

export const REFRESH_AUTH_TIMER_SET = 'REFRESH_AUTH_TIMER_SET';

export const REMOVE_AUTH = 'REMOVE_AUTH';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';



export function registerUser(newUserInfo){
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/register/`,
        headers: [],
        data: {
            username: newUserInfo.username,
            password: newUserInfo.password,
            email: newUserInfo.email,
        }
    })
    return {
        type: REGISTER_USER,
        payload: request,
    }
}
export function registerUserSuccess(newUserInfo){
    return{
        type: REGISTER_USER_SUCCESS,
        payload: newUserInfo
    }
}

export function setRefreshTimerID(timerID){
    return{
        type: REFRESH_AUTH_TIMER_SET,
        payload: timerID
    }
}

export function registerUserFailure(error){
    return{
        type: REGISTER_USER_FAILURE,
        payload: `Failed user registration: ${error.response.status} ${error.response.statusText}`,
    }
}
export function authUser(userCredentials){
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/login/`,
        headers:[],
        data:{
            grant_type: 'password',
            username: userCredentials.username,
            password: userCredentials.password, //should use https, so it is safe from sniffing.
        }
    });

    return{
        type: AUTH_USER,
        payload: request,
    }

}

export function refreshAuth(refreshToken){
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/login/`,
        headers: [],
        data:{
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }
    })

    return{
        type: REFRESH_AUTH,
        payload: request
    }
}

export function refreshAuthFailure(error){
    return{
        type: REFRESH_AUTH_FAILURE,
        payload: `Token refresh error: ${error.response.status} ${error.response.statusText}`,
    }
}

export function refreshAuthSuccess(refreshData){
    return{
        type: REFRESH_AUTH_SUCCESS,
        payload: refreshData,
    }

}
export function authUserSuccess(authInfo){
    return{
        type: AUTH_USER_SUCCESS,
        payload: authInfo,
    }
}

export function authUserFailure(error){
    return{
        type: AUTH_USER_FAILURE,
        payload: `User authentication error: ${error.response.status} ${error.response.statusText}`,
    }
}


export function getUserInfo(userId){
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/profile/${userId}`
    });

    return{
        type: GET_USER_INFO,
        payload: request,
    }
}

export function getUserInfoSuccess(userData){
    return{
        type: GET_USER_INFO_SUCCESS,
        payload: userData,
    }
}

export function getUserInfoFailure(error){
    return{
        type: GET_USER_INFO_FAILURE,
        payload: `Failed to retrieve user info: ${error.response.status} ${error.response.statusText}`,
    }
}

export function removeUserAuth(){
    return{
        type: REMOVE_AUTH,
        payload: null
    }
}
