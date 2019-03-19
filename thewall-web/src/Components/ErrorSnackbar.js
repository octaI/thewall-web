import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {Component} from "react";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => (
    {
        error: {
            backgroundColor: theme.palette.error.dark,
        },
    });

class ErrorSnackbar extends Component{

    render(){
        const {classes} = this.props
        return(
                <div>
                    <Snackbar open={this.props.showError}
                              className={classes.error}
                              autoHideDuration={2000}
                              variant={'error'}
                              message={this.props.errorMsg}
                              onClose={this.props.onClose}
                    />
                </div>

    )


    }



}

export default withStyles(styles)(ErrorSnackbar)