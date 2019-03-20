import React from 'react';
import '../config'
import './NavBar.css'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import FaceIcon from '@material-ui/icons/Face'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Menu from "@material-ui/core/Menu/Menu";
import {NAVBAR_TITLE} from "../config";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip/Chip";

const styles = theme => ({
    userChip: {
        marginRight: '1%',
        marginLeft: '0%',
    },

    appBarTitle: {
        flex: 1,
        display: 'flex',
        justifyContent: 'left'
    },

    button: {
        backgroundColor: '#d2d71e',
        '&:hover': {
            backgroundColor: '#c69f24',
            borderColor: '#c2cc4e',
        },
    }
});

class NavBar extends React.Component{
    state = {
        anchorEl: null,
        refreshIntervalID: null,
    };


    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    logoutUser = () => {
        this.props.removeUserAuth()
    };

    setUserRefreshToken = () => {
        let timerID = setInterval(() => {this.props.refreshAuth(this.props.refreshToken)
        console.log(this.props.refreshToken)},(this.props.expiresIn - 10)*1000);
        this.props.setRefreshTimerID(timerID)
    }

    render(){
        const {classes} = this.props;
        return (
            <div className='root'>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className='menuButton'
                                    color="inherit"
                                    aria-label="Menu"
                                    aria-haspopup="true"
                                    onClick={this.handleClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            getContentAnchorEl={null}
                            open={Boolean(this.state.anchorEl)}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                            transformOrigin={{ vertical: "top", horizontal: "center" }}
                            onClose={this.handleClose}
                        >
                            {!this.props.isAuthed ? <MenuItem
                                component={Link} to="/register"
                                onClick={this.handleClose}>Register</MenuItem> : null}

                        </Menu>
                        <Typography variant="h6" color="inherit"  className={classes.appBarTitle} component={Link} to={'/'} style={{textDecoration: 'none',outline: 0}}>
                            {NAVBAR_TITLE}
                        </Typography>

                        {this.props.isAuthed ? <Chip className={classes.userChip} icon={<FaceIcon/>} label={this.props.username}/> : null}
                        {!this.props.isAuthed ?
                            <Link to={{pathname : '/login', callbacklogin: () =>{ this.setUserRefreshToken()}}} >
                                <Button className={classes.button} variant={"outlined"}>Login</Button>
                            </Link>
                             : <Button className={classes.button} variant={"outlined"} onClick={this.logoutUser}>Logout</Button>}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


export default withStyles(styles)(NavBar);
