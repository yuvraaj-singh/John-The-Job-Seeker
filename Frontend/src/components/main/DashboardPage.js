// DashboardPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100vw',
    height: '60px',
    padding: '0 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: '2px solid black',
    boxSizing: 'border-box', // Ensure no extra space at the top
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#007bff',
    fontSize: '24px',
    fontWeight: 'bold',
},
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
    height: '100%',
  },
  navButton: {
    padding: '0 15px',
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.3s ease, background-color 0.3s ease',
  },
  navButtonHoverState: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: '0',
  },
  contentContainer: {
    display: 'flex',
    gap: '20px',
    width: '100%',
    marginTop: '20px',
  },
  leftPanel: {
    width: '60%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    border: '2px solid #007bff',
    color: '#007bff',
    flexShrink: 0, // Prevent left panel from expanding
    boxSizing: 'border-box', // Ensure consistent sizing
  },
  rightPanel: {
    width: '40%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    border: '2px solid #007bff',
    boxSizing: 'border-box', // Ensure consistent sizing
    flexShrink: 0, // Prevent right panel from expanding
  },
  jobGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    width: '100%',
  },
  card: {
    padding: '10px 20px',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '20px', // Updated to curvy rectangle
    textAlign: 'center',
    fontSize: '16px',
    maxWidth: '100%',
    border: '2px solid #007bff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  cardHover: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  jobTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  jobDetails: {
    marginTop: '10px',
    fontSize: '12px',
    textAlign: 'left',
  },
  jobDetailsRowGrouped: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
    gap: '20px',
  },
  preferencesPanel: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    marginTop: '20px',
    border: '2px solid #007bff',
  },
  preferenceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  chatButton: {
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    marginTop: '20px',
  },
  uploadButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  textField: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '2px solid #007bff',
  },
  iframe: {
    width: '100%',
    height: '500px',
    border: 'none',
    marginTop: '10px',
  },
  sendButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  commentDialog: {
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #007bff',
    borderRadius: '5px',
    minHeight: '50px',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  chatMessage: {
    margin: '5px 0',
    padding: '10px',
    borderRadius: '20px',
    backgroundColor: '#f1f1f1',
    maxWidth: '70%',
    wordWrap: 'break-word', // Add word-wrap to contain long text within the message box
    whiteSpace: 'pre-wrap', // Ensure long text breaks properly without expanding the message box
  },
  chatMessageUser: {
    textAlign: 'right',
    color: '#007bff',
    backgroundColor: '#e1f5fe',
    alignSelf: 'flex-end',
    maxWidth: '50%',
    marginLeft: 'auto',
    wordWrap: 'break-word', // Add word-wrap to contain long text within the message box
    whiteSpace: 'pre-wrap', // Ensure long text breaks properly without expanding the message box
  },
};

const jobListings = [
  {
    title: 'Trainee - CBB',
    company: 'CBB Corporation',
    deadline: 'Dec 31, 2024',
    programmingLanguages: 'Java, Python',
    experience: '0-1 years',
  },
  {
    title: 'IT developer - Quionr',
    company: 'Quionr Technologies',
    deadline: 'Nov 15, 2024',
    programmingLanguages: 'C#, .NET',
    experience: '2-3 years',
  },
  {
    title: 'Developer (Front-end)',
    company: 'Frontier Solutions',
    deadline: 'Jan 10, 2025',
    programmingLanguages: 'JavaScript, React',
    experience: '1-2 years',
  },
  {
    title: 'Data Scientist',
    company: 'DataCorp',
    deadline: 'Feb 5, 2025',
    programmingLanguages: 'Python, R',
    experience: '3-5 years',
  },
  {
    title: 'Cyber Security Analyst',
    company: 'SecureIT',
    deadline: 'Dec 20, 2024',
    programmingLanguages: 'Python, Bash',
    experience: '2-4 years',
  },
  {
    title: 'IT Summer Intern',
    company: 'TechStars',
    deadline: 'May 1, 2025',
    programmingLanguages: 'Java, SQL',
    experience: '0 years (Internship)',
  },
];

const DashboardPage = () => {
  const [hoveredNavIndex, setHoveredNavIndex] = useState(null);
  const navigate = useNavigate();
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { author: 'Carrier Coach', text: 'Hi, how can I help you with?' },
  ]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      setComments([...comments, { author: 'User', text: comment }]);
      setComment('');
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/'); // Redirect to login page or home page after logout
};

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}>Carrier Coach</div>
        <div style={styles.navButtons}>
          {['Find jobs', 'Improve CV', 'Profile', 'Log out'].map((tab, index) => (
            <div
              key={index}
              style={hoveredNavIndex === index ? { ...styles.navButton, ...styles.navButtonHoverState } : styles.navButton}
              onMouseEnter={() => setHoveredNavIndex(index)}
              onMouseLeave={() => setHoveredNavIndex(null)}
              onClick={tab === 'Log out' ? handleLogout : null}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.leftPanel}>
        <h1 style={styles.title}>Job List </h1>
          <div style={styles.jobGrid}>
            {jobListings.map((job, index) => (
              <div
                key={index}
                style={hoveredCardIndex === index ? { ...styles.card, ...styles.cardHover } : styles.card}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
              >
                <div style={styles.jobTitle}>{job.title}</div>
                <div style={styles.jobDetails}>
                  <div style={styles.jobDetailsRowGrouped}>
                    <div><strong>Company:</strong> {job.company}</div>
                    <div><strong>Languages:</strong> {job.programmingLanguages}</div>
                  </div>
                  <div style={styles.jobDetailsRowGrouped}>
                    <div><strong>Deadline:</strong> {job.deadline}</div>
                    <div><strong>Experience:</strong> {job.experience}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.rightPanel}>
        <h1 style={styles.title}>Improve CV</h1>
          <button style={styles.uploadButton} onClick={() => document.getElementById('fileInput').click()}>Choose File</button>
          <input id="fileInput" type="file" accept="application/pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
          {fileUrl && (
            <iframe src={fileUrl} style={styles.iframe} title="PDF Viewer" />
          )}
          <div style={styles.commentDialog}>
            {comments.map((c, index) => (
              <div key={index} style={c.author === 'User' ? { ...styles.chatMessage, ...styles.chatMessageUser } : styles.chatMessage}>
                <strong>{c.author}:</strong> {c.text}
              </div>
            ))}
          </div>
          <textarea placeholder="Add your comments here..." style={styles.textField} rows="4" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button style={styles.sendButton} onClick={handleSendComment}>Send</button>
        </div>
      </div>
      <div style={styles.preferencesPanel}>
        <div style={styles.preferenceItem}><span>Work percentage</span> <span>Full-time</span></div>
        <div style={styles.preferenceItem}><span>Location</span> <span>Oslo</span></div>
        <div style={styles.preferenceItem}><span>Technologies</span> <span>Java, Python</span></div>
      </div>
    </div>
  );
};

export default DashboardPage;
