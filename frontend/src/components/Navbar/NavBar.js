import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import '../Styles/Navbar.css'
import logo from '../images/logo.png'
import { Link as LinkRouter } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SignOut from '../SingOut';
import {connect} from 'react-redux'



const pages = [{ to: '/', name: 'Home' }, { to: '/Cities', name: 'Cities' }];
const settings = [{ to: '/Login', name: 'Sign In' }, { to: '/SignUp', name: 'Sign Up' }];

const NavBar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar className='NavBar'  position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                    </Box>
                    <Box></Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >

                    </Typography>

                    <Box sx={{ flexGrow: 6, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <LinkRouter style={{color:"white", linkStyle: "none"}} to={page.to} key={index} onClick={handleCloseNavMenu}>
                                    <MenuItem style={{ backgroundColor: 'black' }}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                </LinkRouter>
                            ))}
                        </Menu>
                    </Box>
                    <LinkRouter to='/'>             
                    <img className='logo' src={logo} alt='' href="index.html" />
                    </LinkRouter>
                    <Typography
                        variant="h5"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 6,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'end', marginRight: '40px' }}>
                    {pages.map((page,index) => (
                            <LinkRouter style={{color:"white"}} to={page.to} key={index} >
                            <Button 
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'inherit', display: 'block' }}
                            >{page.name}
                            </Button>
                            </LinkRouter>

                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'center'}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {props.user ?
                            <Avatar src={props.user.photoUser} sx={{width: '40px', height: '40px'}}/> :
                            <AccountCircleIcon  sx={{width:'80px', height:'50px', color:'white'}}/>}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {props.user ? 
                            <SignOut handleCloseUserMenu={handleCloseUserMenu}/> :
                            settings.map((element,index) => (  
                                <LinkRouter to={element.to} key={index} onClick={handleCloseUserMenu} >                    
                                <MenuItem >
                                    <Typography textAlign="center">{element.name}</Typography>
                                </MenuItem>
                                </LinkRouter>
                                
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
}

export default connect(mapStateToProps, null)(NavBar)
