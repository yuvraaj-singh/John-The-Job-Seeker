// LoginWithGoogle.js
import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

const LoginWithGoogle = ({ onUserLogin }) => {
    /* const [user, setUser] = React.useState([]); */
    const navigate = useNavigate();

    const handleLoginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userDetails = await getUserDetailsFromGoogleServer(tokenResponse);
            onUserLogin(userDetails);
            navigate('/dashboard');
        },
        onError: (error) => {
            console.error('Login Failed:', error);
        }
    });

    const handleLogoutWithGoogle = () => {
        googleLogout();
        onUserLogin(null);  // Clear the user object
    };

    const getUserDetailsFromGoogleServer = async (codeResponse) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + codeResponse.access_token);
            const data = await response.json();
            console.log('Data:', data);
            /* setUser([data]); */
            return data;
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
