import React from 'react';
import '../config'
import './NavBar.css'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Menu from "@material-ui/core/Menu/Menu";
import {NAVBAR_TITLE} from "../config";


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
        console.log(`${timerID} es el id del timer`)
        this.props.setRefreshTimerID(timerID)
    }

    render(){
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
                            {this.props.isAuthed ? <MenuItem
                                component={Link} to="/profile"
                                onClick={this.handleClose}
                            >Profile</MenuItem> : null}
                        </Menu>
                        <Typography variant="h6" color="inherit" className='grow' align={'center'} component={Link} to={'/'} style={{textDecoration: 'none',outline: 0}}>
                            {NAVBAR_TITLE}
                        </Typography>
                        {!this.props.isAuthed ?
                            <Link to={{pathname : '/login', callbacklogin: () =>{ this.setUserRefreshToken()}}} >
                                <Button color="secondary" variant={'contained'}>Login</Button>
                            </Link>
                             :

                            <Button color="inherit" onClick={this.logoutUser}>Logout</Button>}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


export default NavBar;
