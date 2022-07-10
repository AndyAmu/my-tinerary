import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CountrySelect from '../CountrySelect';
import '../Styles/Login.css'
import { Link as LinkRouter } from "react-router-dom"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import GoogleSignUp from '../GoogleSignUp';
import '../Styles/Body.css'


const theme = createTheme();

export default function SignUp() {
    const [nameUser, setNameUser] = useState("");
    const [lastNameUser, setLastNameUser] = useState("");
    const [photoUser, setphotoUser] = useState("");
    const [email, setEmail] = useState("");
    const [country] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event)
        const userData = {

            nameUser: nameUser,
            lastNameUser: lastNameUser,
            photoUser: photoUser,
            email: email,
            from: "form-SignUp",
            password: password,
            country: event.target[10].value,
        }
        // console.log(userData)
        dispatch(userActions.signUp(userData))

        setNameUser("")
        setLastNameUser("")
        setPassword("")
        setEmail("")
        setphotoUser("")

    };

    return (
        <Box sx={{
            backgroundImage: 'url(https://images7.alphacoders.com/381/381455.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            minHeight: "92vh",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ThemeProvider theme={theme}>
                <Container sx={{ backgroundColor: 'white'}} component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={e => setNameUser(e.target.value)}
                                        value={nameUser}
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={e => setLastNameUser(e.target.value)}
                                        value={lastNameUser}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={e => setphotoUser(e.target.value)}
                                        value={photoUser}
                                        required
                                        fullWidth
                                        id="photoUser"
                                        label="photo URL"
                                        name="photo URL"
                                        autoComplete="photo URL"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CountrySelect
                                        value={country}
                                        required
                                        fullWidth
                                        name="country"
                                        label="country"
                                        type="country"
                                        id="country"
                                        autoComplete="new-country"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: 'rgb(27, 25, 25)' }}
                            >
                                Sign Up
                            </Button>
                            <Grid sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                                <GoogleSignUp />
                            </Grid>
                            <Grid sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <LinkRouter to="/login">
                                        Already have an account? Sign in
                                    </LinkRouter>

                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
        </Box>
    );
}