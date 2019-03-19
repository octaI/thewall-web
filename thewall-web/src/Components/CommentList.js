import Comment from './Comment.js';
import React,{Component} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import CreateComment from '../containers/container_newComment'
import Card from "@material-ui/core/Card/Card";
import Fab from "@material-ui/core/Fab/Fab";
import AddIcon from '@material-ui/icons/Add'
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import ErrorSnackbar from './ErrorSnackbar'

const styles = theme => (
    {
        error: {
            backgroundColor: theme.palette.error.dark,
        },
        fab: {
            margin: theme.spacing.unit,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        }
    }

);


class CommentList extends Component{
    state = {
        showNewCommentForm: false,
        showError: false,
        errorMsg: "",
        key: 1,
    };


    componentWillMount(){
        this.props.getComments();
        this.setState({commentList: this.props.commentList})
    }


    componentDidUpdate(prevProps,prevState,snap){
        if (this.props.error !== prevProps.error){
            if(this.props.error !== null){
                this.setState({showError: true, errorMsg:this.props.error})
            }
        }
        if (this.state.key > prevState.key){
            setTimeout(this.props.getComments,2000)

        }

    }



    renderComments(commentList) {
        if (commentList.length < 1) {
            return(
                <Card> No comments yet, create a new comment!</Card>
            )
        }
           return commentList.map( (comment) => {
               let formattedDate = comment['posted'].split('T')
               let hoursAndMinutes= formattedDate[1].split(':')
               return (
                   <Comment
                       content={comment['content']}
                       key={comment['comment_id']}
                       title={comment['title']}
                       author={comment['author_name']}
                       author_id={comment['authorId']}
                       timelabel={`${formattedDate[0]}  ${hoursAndMinutes[0]}:${hoursAndMinutes[1]}`}
                   >
                   </Comment>
               )
           })

        };

    createNewComment = () => {
        this.props.showSubmitCommentDialog()
    }

    handleNewCommentClose = () => {
        this.props.hideSubmitCommentDialog();
        this.setState({key: this.state.key +1 })
    }

    handleSnackbarClose = () => {
        this.setState({showError: false, errorMsg: ''})
    }


    render(){

        const { classes } = this.props;
        const {loading } = this.props;
        const {commentList} = this.props;
        if (loading) {
            return(
                <div>
                    <CircularProgress/>
                </div>
            );
        } else if (this.props.showSubmitDialog) {
            return(<CreateComment onClose={this.handleNewCommentClose} updateComments={this.props.getComments}/>);
        }
        commentList.sort((a,b) => b.comment_id-a.comment_id); //sorting by newest comments
            return(

                <div key={this.state.key}>
                    <ErrorSnackbar showError={this.state.showError} onClose={this.handleSnackbarClose} errorMsg={this.state.errorMsg} />
                    {this.renderComments(commentList)}
                    {this.props.isAuthed ? <Tooltip title='Add new comment'>
                        <Fab color="primary" aria-label="Add" className={classes.fab}  variant='extended' onClick={this.createNewComment} >
                            <AddIcon />
                        </Fab>
                    </Tooltip> : null}

                </div>
                )

    }


}

export default withStyles(styles)(CommentList);

