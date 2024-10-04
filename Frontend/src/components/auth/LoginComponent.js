import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from './AuthService';
import { FaGoogle } from "react-icons/fa";
import { SiLinkedin } from "react-icons/si";
import { FaGithub } from "react-icons/fa6";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login({ email, password });
            if (response.data.message === 'Login successful') {
                // Save the user's name for further use
                const userName = response.data.name;
                localStorage.setItem('userName', userName);
                navigate('/dashboard');
            } else {
                setMessage('Invalid credentials');
            }
        } catch (error) {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div className="register-container">
            {/* Left Side - Image Section */}
            <div className="illustration-section">
                <img src="./Assets/note.png" alt="Illustration" className="illustration-image" />
            </div>

            {/* Right Side - Form Section */}
            <div className="form-section">
                <h2 className="form-title">Login</h2>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary form-submit">Login</button>
                </form>
                <div className="social-login">
                    <p>Or continue with:</p>
                    <div className="social-icons">
                        <a href="#" className="btn btn-outline-danger"><FaGoogle /></a>
                        <a href="#" className="btn btn-outline-primary"><SiLinkedin /></a>
                    </div>
                </div>
                <p className="already-registered">
                    Not registered? <Link to="/register">Register here</Link>
                </p>
                <p className="motivational-tagline">Unlock your potential, elevate your career.</p>
            </div>
        </div>
    );
};
export default LoginComponent;