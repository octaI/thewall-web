import Comment from './Comment.js';
import React,{Component} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Card from "@material-ui/core/Card/Card";
import Fab from "@material-ui/core/Fab/Fab";
import AddIcon from '@material-ui/icons/Add'
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

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




    componentWillMount(){
        this.props.getComments();
    }

    renderComments(commentList) {
        if (commentList.length < 1) {
            return(
                <Card> No comments yet, create a new comment!</Card>
            )
        }
           return commentList.map( (comment) => {
               return (
                   <Comment content={comment['content']} comment_id={comment['comment_id']} title={comment['title']} author={comment['author_name']}> </Comment>
               )
           })

        }

    render(){
        const { classes } = this.props;
        const {commentList, error, loading} = this.props.commentData;
        if (loading) {
            return(
                <div>
                    <CircularProgress/>
                </div>
            );
        } else if (error){
            return(
                <div>
                    <Card>{error}</Card>
                </div>
            );
        }
            return(
                <div>
                    {this.renderComments(commentList)}
                    <Tooltip title='Add new comment'>
                        <Fab color="primary" aria-label="Add" className={classes.fab}  variant='extended'  >
                            <AddIcon />
                        </Fab>
                    </Tooltip>

                </div>
                )

    }


}

export default withStyles(styles)(CommentList);

