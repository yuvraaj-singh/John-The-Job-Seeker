import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from './AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginWithGoogle from './LoginWithGoogle';

const LoginComponent = ({ onUserLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login({ email, password });
            if (response.data === 'Login successful') {
                onUserLogin(response.data);
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
                        <LoginWithGoogle onUserLogin={onUserLogin} />
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