import {GET_COMMENTS,GET_COMMENTS_SUCCESS,GET_COMMENTS_FAILURE, POST_COMMENT_SUCCESS, POST_COMMENT, POST_COMMENT_FAILURE,SHOW_SUBMIT_DIALOG,HIDE_SUBMIT_DIALOG } from '../actions/comments';


const INITIAL_STATE =
    {
        error: null,
        loading: null,
        commentData: {commentList: []},
        newComment: {content: null,title:null,authorId:null},
        showSubmitDialog: false

    };

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return {...state,commentData: {commentList: []},error: null, loading: true};

        case GET_COMMENTS_SUCCESS:
            return {...state, commentData: {commentList: action.payload}, error: null, loading: false};

        case GET_COMMENTS_FAILURE:
            return{...state, commentData: {commentList: []}, error: action.payload, loading: false};

        case POST_COMMENT:
            return {...state, loading: true, error: null,newComment: {content: action.payload.content, title: action.payload.title,authorId: action.payload.authorId},showSubmitDialog: false};

        case POST_COMMENT_SUCCESS:
            return {...state, loading: false, error: null, newComment: {content: null, title: null, authorId: null}};

        case POST_COMMENT_FAILURE:
            return {...state, loading: false, error: action.payload};

        case SHOW_SUBMIT_DIALOG:
            return {...state,showSubmitDialog: true};

        case HIDE_SUBMIT_DIALOG:
            return {...state,showSubmitDialog: false};

        default:
            return state;
    }
}