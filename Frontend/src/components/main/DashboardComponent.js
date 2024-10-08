import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './logout.css';

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
  }
  
    
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

  const handleUploadResume = () => {
    // Create a hidden file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx'; // Acceptable file types
    fileInput.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Uploaded file: ", file.name); // Handle the uploaded file here
            navigate('/uploaded_file', { state: { fileName: file.name } }); // Redirect to new page and pass file name
        }
    };
    fileInput.click(); // Trigger the file input dialog
};


  return (
      <div style={styles.container}>
          <div style={styles.header}>
            <span className="userName">Hello, {userName}</span>
        <button
            className={`logoutButton ${isHovering ? 'logoutButtonHover' : ''}`}
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
              <button style={{ ...styles.button, ...styles.uploadButton }} onClick={handleUploadResume}>Upload Resume</button>
          </div>
      </div>
  );
};

export default DashboardComponent;
