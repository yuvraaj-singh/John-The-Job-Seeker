import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from './AuthService';
import LoginWithGoogle from './LoginWithGoogle';
import './RegisterComponent.css'; // Ensure your CSS file is linked

const RegisterComponent = ( {onUserLogin} ) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.register({ firstName, lastName, email, password });
            setMessage(response.data);
            if (response.data === 'User registered successfully') {
                navigate('/login');
            }
        } catch (error) {
            setMessage('Registration failed');
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
                <h2 className="form-title">Create an Account</h2>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <div class="row g-3">
                            <div class="col">
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div class="col">
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
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
                    <div className="form-group terms-and-conditions">
                        <input type="checkbox" id="terms"  required/>
                        <label htmlFor="terms">I agree to the <a href="#">Terms and Conditions*</a></label>
                    </div>
                    <button type="submit" className="btn btn-primary form-submit">Create Account</button>
                </form>
                <div className="social-login">
                    <p>Or continue with:</p>
                    <div className="social-icons">
                    <LoginWithGoogle onUserLogin={onUserLogin} />
                    </div>
                </div>
                <p className="already-registered">
                    Already registered? <Link to="/login">Login here</Link>
                </p>
                <p className="motivational-tagline">Unlock your potential, elevate your career.</p>
            </div>
        </div>
    );
};

export default RegisterComponent;
