import {GET_COMMENTS,GET_COMMENTS_SUCCESS,GET_COMMENTS_FAILURE } from '../actions/comments';


const INITIAL_STATE =
    {
        teststore: 'HOla',
        commentData: {commentList: [], error: null, loading: false},
        newComment: {comment: null, error: null, loading: false},

    };

export default function(state=INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case GET_COMMENTS:
            return {...state,commentData: {commentList: [],error: null, loading: true}};

        case GET_COMMENTS_SUCCESS:
            let new_state = {...state, commentData: {commentList: action.payload, error: null, loading: false}};
            return {...state, commentData: {commentList: action.payload, error: null, loading: false}};

        case GET_COMMENTS_FAILURE:
            return{...state, commentData: {commentList: [], error: action.payload, loading: false}};

        default:
            return state;
    }
}