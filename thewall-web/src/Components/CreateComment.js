import React,{Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close'
import Button from "@material-ui/core/Button/Button";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

const styles = theme => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    submitButton: {
        marginTop: theme.spacing.unit*3,
        marginBottom: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        float: 'right'
    },

    submitError: {
        backgroundColor: theme.palette.error.light,
        bottom: 0,
        top: 'auto'
    }
});

class CreateComment extends Component {
    state = {
        title: "",
        content:"",
        open: true,
        titleError: false,
        contentError: false,
        errorMsg: "",
        titleHelperText: "",
        contentHelperText: "",
        submitError: false,
    }


    handleChange = (name) => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submitNewComment = () => {
        if (this.state.contentError || this.state.titleError){
            this.setState({submitError: true, errorMsg: 'Error when submitting! Check required fields'})
        } else if (!this.props.isAuthed){
            this.setState({submitError: true, errorMsg: "You must be logged in to post!"})
        } else{
            this.props.postComment({content: this.state.content, title: this.state.title, authorId: this.props.userData.userId},this.props.authToken);
            this.setState({submitError: false, errorMsg: ""});
            this.handleDialogClose();
        }
    }

    handleOnBlurTitle = ()=> {
        if (this.state.title.length < 8) {
            this.setState({titleError: true, titleHelperText:'Title must have a minimum of 8 characters'})
        } else{
            this.setState({titleError: false, titleHelperText: ''})
        }
    }

    handleOnBlurContent = () => {
        if (this.state.content.length < 10) {
            this.setState({contentError: true, contentHelperText: 'Content must have a minimum of 10 characters'})
        } else {
            this.setState({contentError: false, contentHelperText: ""})
        }
    }

    handleDialogClose = ()=> {

        this.setState({open: false});
        this.props.onClose()
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ submitError: false });
    };
    render(){

        const {classes} = this.props;


    return(
        <div>


            <Dialog fullWidth className={classes.container} open={this.state.open} onClose={this.handleDialogClose}>
                <div>
                    <IconButton style={{float: 'right'}} onClick={this.handleDialogClose}>
                        <CloseIcon></CloseIcon>
                    </IconButton>
                </div>

                <div>
                    <Snackbar open={this.state.submitError}
                              className={classes.submitError}
                              autoHideDuration={2000}
                              variant={'error'}
                              message={this.state.errorMsg}
                              onClose={this.handleClose}
                    />
                </div>

                <form className={classes.container}>
                        <TextField
                            error={this.state.titleError}
                            helperText={this.state.titleHelperText}
                            className={classes.textField}
                            onBlur={this.handleOnBlurTitle}
                            style={{width: '20%'}}
                            id="commentTitle"
                            label="Title"
                            placeholder="A comment title"
                            value={this.state.title}
                            onChange={this.handleChange('title')}/>
                        <TextField
                            onBlur={this.handleOnBlurContent}
                            error={this.state.contentError}
                            helperText={this.state.contentHelperText}
                            id="commentContent"
                            className={classes.textField}
                            label='Content'
                            placeholder="Write your comment here"
                            multiline
                            value={this.state.content}
                            margin='normal'
                            onChange={this.handleChange('content')}
                        >
                        </TextField>
                    </form>
                <div>
                    <Button disabled={this.state.content.length <= 0 && this.state.title.length <= 0} variant={"contained"} className={classes.submitButton} onClick={this.submitNewComment}>Submit</Button>
                </div>
            </Dialog>
        </div>
        )

    }

}

export default withStyles(styles)(CreateComment);