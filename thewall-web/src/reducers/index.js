import { combineReducers } from 'redux';
import CommentsReducer from './reducer_comments'

const rootReducer = combineReducers({
    CommentListState: CommentsReducer,

});

export default rootReducer;