import { combineReducers } from 'redux';
import CommentsReducer from './reducer_comments'
import UserReducer from './reducer_user'

const rootReducer = combineReducers({
    CommentListState: CommentsReducer,
    UserState: UserReducer,

});

export default rootReducer;