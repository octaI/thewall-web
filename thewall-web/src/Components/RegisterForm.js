import React,{Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import ErrorSnackbar from "./ErrorSnackbar";
import axios from 'axios'
import {ROOT_URL} from "../config";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const styles = theme => (
    {
        registerContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        textfield: {
            width: '30%',
            marginRight: 'auto',
            marginLeft: 'auto',
        },
        button: {
            marginTop: 35,
            marginRight: 'auto',
            marginLeft: 'auto'
        }

    }
);



class RegisterForm extends Component{
    state = {
        username: "",
        email:"",
        password: "",
        passwordConfirmation: "",
        firstName: "",
        lastName:"",
        usernameError: "",
        emailError:"",
        passwordError:"",
        passwordConfirmationError: "",

    };

    componentDidUpdate(prevProps,prevState,snap){
        if (this.props !== prevProps){
            if (this.props.error === null){
                this.props.history.push('/')
            }
        }
    }

    validateUsernameInput = () => {
        if (this.state.username.length < 8){
            this.setState({usernameError: 'Username must be of minimum 8 characters'})
        } else {
            axios({
                method: 'get',
                url: `${ROOT_URL}/username/check?username=${this.state.username}`
            }).then((res) => {
              this.setState({usernameError: ""}) //username is OK
            }).catch((error) => {
               this.setState({usernameError: 'Username already in use'})
            })

        }
    }

    validateEmailInput = () => {
        if ( /\S+@\S+\.\S+/.test(this.state.email) === false){
            this.setState({emailError: 'Invalid email format'})
        } else {
            axios({
                method: 'get',
                url: `${ROOT_URL}/email/check?email=${this.state.email}`
            }).then((res) => {
                this.setState({emailError: ""}) //username is OK
            }).catch((error) => {
                this.setState({emailError: 'Email address already in use'})
            })
        }
    }

    validatePasswordLength = () => {
        if (this.state.password.length < 8) {
            this.setState({passwordError: 'Password must have a minimum of 8 characters'})
        } else {
            this.setState({passwordError: ""})
        }
    }

    validateMatchingPassword = () => {
        if (this.state.password !== this.state.passwordConfirmation) {
            this.setState({passwordConfirmationError: "Password confirmation does not match"})
        } else {
            this.setState({passwordConfirmationError: ""})
        }
    }


     handleChangeRegisterData = (name) => (event) => {
         this.setState({[name]: event.target.value})
    }

    handleRegistrationSubmit = () => {
        const newUserInfo = {username: this.state.username, password: this.state.password, email: this.state.email, first_name: this.state.firstName, last_name: this.state.lastName }
        this.props.createUser(newUserInfo)

    }


    render(){
        const {classes, loading, error} = this.props;
        if (loading){
            return (
                <CircularProgress/>
            )
        }
        return(
           <div >
               <ErrorSnackbar showError={error !== null} errorMsg={error}/>
               <form className={classes.registerContainer}>
                    <TextField required error={this.state.usernameError !== ""} helperText={this.state.usernameError} className={classes.textfield} label={'Username'} value={this.state.username} onChange={this.handleChangeRegisterData('username')} onBlur={this.validateUsernameInput}/>
                    <TextField required error={this.state.emailError !== ""} helperText={this.state.emailError} className={classes.textfield} label={'E-mail'} value={this.state.email} onChange={this.handleChangeRegisterData('email')} onBlur={this.validateEmailInput}/>
                    <TextField required error={this.state.passwordError !== ""} helperText={this.state.passwordError} className={classes.textfield} label={'Password'} type={'password'} value={this.state.password} onChange={this.handleChangeRegisterData('password')} onBlur={this.validatePasswordLength}/>
                    <TextField required error={this.state.passwordConfirmationError !== ""} helperText={this.state.passwordConfirmationError} className={classes.textfield} label={'Confirm Password'} type={'password'} value={this.state.passwordConfirmation} onChange={this.handleChangeRegisterData('passwordConfirmation')} onBlur={this.validateMatchingPassword}/>
                    <TextField className={classes.textfield} label={'First Name'} value={this.state.firstName} onChange={this.handleChangeRegisterData('firstName')}/>
                    <TextField className={classes.textfield} label={'Last Name'} value={this.state.lastName} onChange={this.handleChangeRegisterData('lastName')}/>
                    <Button variant={'contained'} disabled={this.state.usernameError !== "" || this.state.passwordConfirmationError !== "" ||
                    this.state.passwordError !== "" || this.state.emailError !== "" || this.state.username === "" || this.state.password === "" || this.state.email === "" || this.state.passwordConfirmation === "" }
                            className={classes.button} onClick={this.handleRegistrationSubmit} >Submit </Button>
               </form>

           </div>
       )
    }


}



export default withStyles(styles)(RegisterForm);