import {connect} from 'react-redux'
import {getComments,getCommentsFailure,getCommentsSuccess} from "../actions/comments";
import CommentList from '../Components/CommentList';

const mapStateToProps = (state) => {
    return {
        commentData: state.CommentListState.commentData,
        addComment: state.CommentListState.newComment,
        teststore: state.CommentListState.teststore,
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

                dispatch(getCommentsFailure(error.message));
                }

            )
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(CommentList)