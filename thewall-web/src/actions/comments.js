import axios from 'axios'
import '../config'
import {ROOT_URL} from "../config";

export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';

export const POST_COMMENT = 'POST_COMMENT';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';


export function getComments(){
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/comments/`,
        headers: []
    });

    return{
        type: GET_COMMENTS,
        payload: request
    };
}

export function getCommentsSuccess(comments){
    return {
        type: GET_COMMENTS_SUCCESS,
        payload: comments
    };
}

export function getCommentsFailure(error) {
    return{
        type: GET_COMMENTS_FAILURE,
        payload: error
    };
}