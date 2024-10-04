import React, { useEffect, useState } from 'react';
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
    header: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '40px', // Space between the username and the logout button
      padding: '20px',
      width: '100%',
      backgroundColor: '#ffffff',
      position: 'absolute',
      top: 0,
      right: 0,
  },
  userName: {
      fontSize: '16px',
      color: '#000',
  },
  logoutButton: {
      padding: '8px 15px',
      borderRadius: '0.25rem',
      border: '1px solid black',
      backgroundColor: 'white',
      color: 'black',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out',
  },
  logoutButtonHover: {
      backgroundColor: 'black',
      borderColor: 'white',
      color: "white"
  },
  
  
    
};

const DashboardComponent = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
      // Get the user's name from localStorage
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
          setUserName(storedUserName);
      }
  }, []);

  const handleGetStartedClick = () => {
      navigate('/search_job');
  };

  const handleLogout = () => {
      console.log("Logging out...");
      localStorage.removeItem('userName'); // Clear stored user name
      navigate('/login');
  };

  return (
      <div style={styles.container}>
          <div style={styles.header}>
            <span style={styles.userName}>Hello, {userName}</span>
    <button
        style={{
            ...styles.logoutButton,
            ...(isHovering ? styles.logoutButtonHover : {}),
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleLogout}
    >
        Log Out
    </button>
</div>
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
