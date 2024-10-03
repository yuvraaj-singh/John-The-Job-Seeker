import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#ffffff',
        position: 'relative', // Necessary for absolute positioning of the log out button and username
    },
    leftPanel: {
      width: '40%',
    },
    rightPanel: {
      width: '60%',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
      marginLeft: '20px',
      color: 'white',
    },
    getStartedButton: {
      backgroundColor: '#4CAF50',
    },
    uploadButton: {
      backgroundColor: '#2196F3',
    },
    logoutButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      padding: '10px 15px',
      borderRadius: '8px',
      border: '1px solid #000',
      backgroundColor: 'transparent',
      color: '#000',
      fontSize: '16px',
      cursor: 'pointer',
    },
    userName: {
      position: 'absolute',
      top: '30px',
      right: '150px', // Adjust based on the size of the logout button and username display
      color: '#000',
      fontSize: '16px',
      fontWeight: 'normal',
    },
};

const DashboardComponent = () => {
    const navigate = useNavigate();
    const userName = "John Doe"; // Simulated user name

    const handleGetStartedClick = () => {
        navigate('/search_job'); 
    };

    const handleLogout = () => {
        // Perform logout logic here
        console.log("Logging out...");  // Placeholder for actual logout logic
        navigate('/login');  // Redirect to login page or home page after logout
    };

    return (
        <div style={styles.container}>
            <span style={styles.userName}>{userName}</span>
            <button style={styles.logoutButton} onClick={handleLogout}>Log Out</button>
            <div style={styles.leftPanel}>
                <img src="\Assets\carrier_tree.PNG" alt="Career Aspects Infographic" style={{ width: '100%', height: 'auto' }} />
            </div>
            
            <div style={styles.rightPanel}>
                <h1>Ready to Land Your Dream Job?</h1>
                <p>Join thousands of others who have found perfect job matches through our platform.</p>
                <button style={{ ...styles.button, ...styles.getStartedButton }} onClick={handleGetStartedClick}>Get Started</button>
                <button style={{ ...styles.button, ...styles.uploadButton }}>Upload Resume</button>
            </div>
        </div>
    );
};

export default DashboardComponent;
