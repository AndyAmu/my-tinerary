import React from 'react'
import Typography from '@mui/material/Typography'
import {Link as LinkRouter} from "react-router-dom"
import MenuItem from '@mui/material/MenuItem'
import {connect} from 'react-redux';
import userActions from '../redux/actions/userActions'

function SignOut(props) {
    function signOut() {
		props.signOut(props.user.email)
	}
    return ( //returno el HTML
        <MenuItem onClick={props.handleCloseUserMenu}>
            <LinkRouter to={'/'}>
                <Typography onClick={signOut} className='fredokaFont' sx={{color: 'black'}}>Sign Out</Typography>
            </LinkRouter>
        </MenuItem>       
    )
}

const mapDispatchToProps = {
	signOut: userActions.signOut,
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut)