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
      color: 'white',
    },
    getStartedButton: {
      backgroundColor: '#4CAF50',
    },
    uploadButton: {
      backgroundColor: '#2196F3',
    },
  };
  
const DashboardComponent = () => {
    const navigate = useNavigate();
  
  const handleGetStartedClick = () => {
    navigate('/search_job'); 
  };

    return (
    <div style={styles.container}>
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