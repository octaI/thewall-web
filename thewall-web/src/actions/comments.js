import axios from 'axios'
import '../config'
import {ROOT_URL} from "../config";

export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';

export const POST_COMMENT = 'POST_COMMENT';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';

export const SHOW_SUBMIT_DIALOG = 'SHOW_SUBMIT_DIALOG';
export const HIDE_SUBMIT_DIALOG = 'HIDE_SUBMIT_DIALOG';


export function showSubmitCommentDialog(){
    return{
        type: SHOW_SUBMIT_DIALOG,
        payload: null
    }

}

export function hideSubmitDialog(){
    return{
        type: HIDE_SUBMIT_DIALOG,
        payload: null
    }
}


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
        payload: `Error fetching comments: ${error.response.status} ${error.response.statusText}`
    };
}

export function postComment(newComment,authToken){
    const request= axios({
        method: 'post',
        url: `${ROOT_URL}/comments/`,
        data: {title: newComment.title, content: newComment.content, author_id: newComment.authorId},
        headers: {
            Authorization: 'Bearer ' + authToken
        }
    });

    return {
        type: POST_COMMENT,
        payload: request
    };
}

export function postCommentSuccess(response){
    return{
        type: POST_COMMENT_SUCCESS,
        payload: response,
    }
}

export function postCommentFailure(error){
    return{
        type: POST_COMMENT_FAILURE,
        payload: `Submit Error: ${error.response.status} ${error.response.statusText}`,
    }
}