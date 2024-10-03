import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
        display: 'flex',  // Flex layout for side-by-side panels
        alignItems: 'center',  // Align items vertically
        height: '100vh',  // Full viewport height
        backgroundColor: 'white',  // White background
        padding: '20px',
        position: 'relative' // Necessary for absolute positioning of the log out button and username
      },
      leftPanel: {
        width: '40%',
        display: 'flex',
        alignItems: 'center',  // Center the image vertically
        justifyContent: 'center',  // Center the image horizontally
        padding: '20px',  // Padding for spacing
      },
      rightPanel: {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: '108.6%',  // Increase the width to 90% of the container
        height: 'auto',  // Maintain aspect ratio
      },
      searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        width: '100%',
      },
      input: {
        padding: '10px',
        margin: '0 10px',
        border: '2px solid black',
        borderRadius: '4px',
        minWidth: '200px',
        width: '40%',
      },
      searchButton: {
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#007bff',  // Blue button
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
      },
      dropdownContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '60%',
        margin: '20px 0',
      },
      dropdown: {
        padding: '10px',
        border: '2px solid black',
        borderRadius: '4px',
        flex: '1 1 45%',
        color: '#333',
        backgroundColor: 'transparent',
      },
      label: {
        fontWeight: 'bold',
        marginBottom: '5px',
        color: 'black',
      },
      userName: {
        position: 'absolute',
        top: '30px',
        right: '150px', // Adjust based on the size of the logout button and username display
        color: '#000',
        fontSize: '16px',
        fontWeight: 'normal',
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
    };


    
const SearchTab = () => {
    const userName = "John Doe";
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic here
        console.log("Logging out...");  // Placeholder for actual logout logic
        navigate('/');  // Redirect to login page or home page after logout
    };
    return (
        <div style={styles.container}>
            <span style={styles.userName}>{userName}</span>
            <button style={styles.logoutButton} onClick={handleLogout}>Log Out</button>
      <div style={styles.leftPanel}>
        <img src="Assets/carrier_tree.png" alt="Descriptive Alt Text" style={styles.image} />
      </div>
      <div style={styles.rightPanel}>
        <div style={styles.searchContainer}>
          <input type="text" placeholder="Search by Job Title/Skills/Employer" style={styles.input} />
          <button style={styles.searchButton}>Search</button>
        </div>
        <div style={styles.dropdownContainer}>
          <div>
            <label style={styles.label}>Location</label>
            <select style={styles.dropdown}>
              <option value="Oslo, Norway">Oslo, Norway</option>
              {/* More options */}
            </select>
          </div>
          <div>
            <label style={styles.label}>Category</label>
            <select style={styles.dropdown}>
              <option value="IT, Computer Science">IT, Computer Science</option>
              {/* More options */}
            </select>
          </div>
        </div>
      </div>
    </div>

    );
};


export default SearchTab;
