import React from 'react';
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


class NavBar extends React.Component{
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

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
                            <MenuItem
                            component={Link} to="/about"
                            onClick={this.handleClose}>About</MenuItem>
                            <MenuItem
                                component={Link} to="/topics"
                                onClick={this.handleClose}
                            >Profile
                            </MenuItem>
                                <MenuItem
                                    onClick={this.handleClose}>Logout
                                </MenuItem>
                        </Menu>
                        <Typography variant="h6" color="inherit" className='grow'>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


export default NavBar;
