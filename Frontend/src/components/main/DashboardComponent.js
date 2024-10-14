// DashboardComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardComponent = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();   // Call the onLogout function passed as props
        navigate('/login');  // Redirect to login after logout
    };

    return (
        <div className="container mt-5">
            <h2>Dashboard</h2>
            <p>Welcome, {user?.email}!</p>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default DashboardComponent;
