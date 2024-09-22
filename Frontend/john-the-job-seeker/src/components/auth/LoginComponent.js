import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from './AuthService';
import { FaGoogle } from "react-icons/fa";
import { SiLinkedin } from "react-icons/si";
import { FaGithub } from "react-icons/fa6";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login({ email, password });
            if (response.data === 'Login successful') {
                navigate('/dashboard');
            } else {
                setMessage('Invalid credentials');
            }
        } catch (error) {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header center" >Login Form</div>
                        <div className="card-body">
                            {message && <div className="alert alert-danger">{message}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Login</button>
                            </form>
                            <p class="mt-3 d-inline-flex gap-2">
                                <span>Not registered? <Link to="/register">Register here</Link></span>
                                <span>Or continue with: </span>
                                <a href="#" class="d-inline-flex btn btn btn-outline-danger" role="button" data-bs-toggle="button"><FaGoogle /></a>
                                <a href="#" class="d-inline-flex btn btn btn-outline-primary" role="button" data-bs-toggle="button"><SiLinkedin /></a>
                                <a href="#" class="d-inline-flex btn btn btn-outline-secondary" role="button" data-bs-toggle="button"><FaGithub /></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;