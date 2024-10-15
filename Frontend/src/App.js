// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './components/auth/LoginComponent';
import RegisterComponent from './components/auth/RegisterComponent';
import DashboardComponent from './components/main/DashboardComponent';

function App() {
    const [user, setUser] = useState(null);


    // Check if user is already logged in by looking at localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Function to handle login and registration success
    const handleUserLogin = (userData) => {
        setUser(userData);
        console.log('User: ', userData);
        localStorage.setItem('user', JSON.stringify(userData));  // Persist user in localStorage
    };

    // Function to handle logout
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route 
                        path="/login" 
                        element={<LoginComponent onUserLogin={handleUserLogin} />} 
                    />
                    <Route 
                        path="/register" 
                        element={<RegisterComponent onUserLogin={handleUserLogin} />} 
                    />
                    <Route 
                        path="/dashboard" 
                        element={user ? <DashboardComponent user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
                    />
                    {/* Redirect root path to login */}
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
