import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions'
import { useNavigate } from 'react-router';


export default function GoogleSignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleCallbackResponse(response) {
        // console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        // console.log(userObject);
        await dispatch(userActions.signInUser({

                email: userObject.email,
                from: 'google',
                password: userObject.sub
            

        }))

        const token = localStorage.getItem('token')//recupero el token de local store si esta seteado
    if (token) {// si esta el token lo redirecciono al Navigate
        navigate("/")
        }
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '603076230779-1sch3rod74rrt1u3ql2akur0ilkhb15c.apps.googleusercontent.com',
            callback: handleCallbackResponse
                });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "medium", locale: "en" }
        )
    });

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}