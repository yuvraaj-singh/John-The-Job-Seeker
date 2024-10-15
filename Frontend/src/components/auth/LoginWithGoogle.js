// LoginWithGoogle.js
import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { AuthenticationRequest } from '../../payload/AuthenticationRequest';
import { AuthenticationResponse } from '../../payload/AuthenticationResponse';
import AuthService from './AuthService';

const LoginWithGoogle = ({ onUserLogin }) => {
    /* const [user, setUser] = React.useState([]); */
    const navigate = useNavigate();

    const handleLoginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log('Google Login Success:', tokenResponse);
            const userDetails = await getUserDetailsFromGoogleServer(tokenResponse);

            const loginRequest = AuthenticationRequest(null, null, userDetails.email, null, true, tokenResponse.access_token);
            const response = await AuthService.login(loginRequest);
            const { error, message, user, tokenUser } = AuthenticationResponse(response.data);
            if (error) {
                navigate('/login');
                console.log('Login Failed:', message);
                return;
            }

            onUserLogin(user);
            navigate('/dashboard');
        },
        onError: (error) => {
            console.error('Login Failed:', error);
        }
    });


    const getUserDetailsFromGoogleServer = async (codeResponse) => {
        try {
            const userInfoURL = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + codeResponse.access_token;
            console.log('User Info URL:', userInfoURL);
            const response = await fetch(userInfoURL);
            const data = await response.json();
            return await data;
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <a className="btn btn-outline-danger" onClick={handleLoginWithGoogle}>
           <FaGoogle />
        </a>
    );
};

export default LoginWithGoogle;
