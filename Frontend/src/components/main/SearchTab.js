import React from 'react';

const styles = {
  container: {
    backgroundColor: '#f0f4f7',
    padding: '20px',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '50%',
  },
};

function PageTwo() {
  return (
    <div style={styles.container}>
      <input type="text" placeholder="Search job titles, skills, or employers" style={styles.input} />
      <select style={styles.input}>
        <option value="">Select Location</option>
        {/* More options */}
      </select>
      <select style={styles.input}>
        <option value="">Select Category</option>
        {/* More options */}
      </select>
      <footer style={{ fontSize: '12px', color: '#666' }}>
        © 2023 Your Company Name. All rights reserved.
      </footer>
    </div>
  );
}

export default PageTwo;
