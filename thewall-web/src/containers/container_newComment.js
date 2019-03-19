import {connect} from 'react-redux'
import {postComment,postCommentSuccess,postCommentFailure} from "../actions/comments";
import CreateComment from '../Components/CreateComment';

const mapStateToProps = (state) =>{
    return{
        isAuthed: state.UserState.isAuthed,
        userData: state.UserState.userData,
        authToken: state.UserState.authToken,
        error: state.CommentListState.error,
        loading: state.CommentListState.loading
    }
};


const mapDispatchToProps = (dispatch) => {
    return{
        postComment: (newComment,authToken) => {
            dispatch(postComment(newComment,authToken)).then((res) => {
                dispatch(postCommentSuccess(res));
            }).catch((error) =>{
                dispatch(postCommentFailure(error))
            })
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateComment)