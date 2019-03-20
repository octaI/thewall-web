import React,{Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import ErrorSnackbar from "./ErrorSnackbar";

const styles = theme => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    textfield: {
        width: '30%',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
        marginTop: 35,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '5%'
    }
});

class Login extends Component{
    state = {
        refreshTimerID: null,
        showError: false,
        errorMsg: "",
        username: "",
        password: "",
    }

    componentDidUpdate(prevProps){
        if (this.props !== prevProps){
            if (this.props.error !== null){
                this.setState({showError: true, errorMsg: this.props.error})
            }
        }
        if (this.props.isAuthed === true && prevProps.isAuthed === false) {
            this.props.history.push('/')
        }

    }

    componentWillUnmount(){
        if (this.props.isAuthed === true){
            this.props.location.callbacklogin();
        }
    }

    handleClick = () => {
        this.props.authUser({username: this.state.username,password:this.state.password})
    }

    handleChange = (name) => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleKeyPress = (event)  => {
        if (event.key === 'Enter'){
            this.handleClick();
            event.preventDefault();
        }
    }

    render() {
        const {classes} = this.props;
        return(
            <div>
                <ErrorSnackbar showError={this.state.showError} onClose={this.handleSnackbarClose} errorMsg={this.state.errorMsg} />
                <form className={classes.container}>

                    <TextField className={classes.textfield}
                               value={this.state.username}
                               onChange={this.handleChange('username')}
                               label={'Username'}>Username </TextField>

                    <TextField label={'Password'} type={'password'} className={classes.textfield}
                               value={this.state.password} onChange={this.handleChange('password')} onKeyPress={ this.handleKeyPress}/>
                    <Button disabled={this.state.username==="" || this.state.password ===""} variant={"contained"} color={"primary"} className={classes.button} onClick={this.handleClick}>Submit</Button>
                </form>
            </div>

        )
    }

}



export default withStyles(styles)(Login);