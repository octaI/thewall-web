import {connect} from 'react-redux'
import {getComments, getCommentsFailure, getCommentsSuccess, showSubmitCommentDialog, hideSubmitDialog} from "../actions/comments";
import CommentList from '../Components/CommentList';

const mapStateToProps = (state) => {
    return {
        commentData: state.CommentListState.commentData,
        commentList: state.CommentListState.commentData.commentList,
        addComment: state.CommentListState.newComment,
        isAuthed: state.UserState.isAuthed,
        error: state.CommentListState.error,
        showSubmitDialog: state.CommentListState.showSubmitDialog,
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        getComments: () => {
            dispatch(getComments()).then((res) =>
                {
                    dispatch(getCommentsSuccess(res.payload.data));
                }

            ).catch( (error) =>{

                dispatch(getCommentsFailure(error));
                }

            )
        },

        showSubmitCommentDialog: () => {
            dispatch(showSubmitCommentDialog())
        },

        hideSubmitCommentDialog: () => {
            dispatch(hideSubmitDialog())
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(CommentList)