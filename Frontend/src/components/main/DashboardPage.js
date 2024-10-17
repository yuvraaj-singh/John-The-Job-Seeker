// DashboardPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = {
  header: {
    height: '60px',
    flexShrink: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: '0 20px',
    boxSizing: 'border-box',
    position: 'fixed', // Ensure header covers the entire page
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Keep header on top
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100vh',
    paddingTop: '60px', // Add padding to prevent content from being hidden under the fixed header
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
    color: 'white',
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
    overflowY: 'auto', // Add scroll for overflowing content
    maxHeight: '700px', // Limit height to allow scrolling
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
    maxHeight: '500px', // Limit height to allow scrolling
    overflowY: 'auto', // Add scroll for overflowing job listings
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
  cardSelected: {
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
    position: 'relative',
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
    position: 'relative',
    right: '0',
    bottom: '0',
    marginLeft: 'auto', // Align button to the right within preferences panel
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
  dropdown: {
    padding: '10px',
    borderRadius: '5px',
    border: '2px solid #007bff',
    backgroundColor: 'white',
    fontSize: '16px',
    color: '#007bff',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '10px',
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
  const navigate = useNavigate();
  const [hoveredNavIndex, setHoveredNavIndex] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { author: 'Carrier Coach', text: 'Hi, how can I help you with?' },
  ]);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const commentEndRef = useRef(null);

  useEffect(() => {
    if (commentEndRef.current) {
      commentEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSendComment = async () => {
    if (comment.trim()) {
      setComments([...comments, { author: 'User', text: comment }]);
      setIsLoading(true);
      setComment('');
      try {
        const response = await axios.post('http://localhost:11434/api/chat', {
          model: 'tinyllama',
          messages: [
            { role: 'system', content: "Please keep your answers short and to the point." },
            { role: 'user', content: comment },
          ],
          stream: false,
        });
        if (response.data && response.data.message && response.data.message.content) {
          setComments((prevComments) => [
            ...prevComments,
            { author: 'Carrier Coach', text: response.data.message.content },
          ]);
        }
      } catch (error) {
        console.error('Error communicating with the assistant:', error);
      }
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/'); // Redirect to login page or home page after logout
  };

  const handleApplyPreferences = () => {
    console.log('Preferences Applied:');
    console.log('Work Percentage:', document.querySelector('select[name="work-percentage"]').value);
    console.log('Location:', document.querySelector('select[name="location"]').value);
    console.log('Technologies:', document.querySelector('select[name="technologies"]').value);
  };

  const handleJobClick = (job, index) => {
    console.log('Job Clicked:', job.title);
    console.log('Company:', job.company);
    console.log('Deadline:', job.deadline);
    console.log('Languages:', job.programmingLanguages);
    console.log('Experience:', job.experience);
    setSelectedJobIndex(index);
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
                style={
                  selectedJobIndex === index
                    ? { ...styles.card, ...styles.cardSelected }
                    : hoveredCardIndex === index
                    ? { ...styles.card, ...styles.cardHover }
                    : styles.card
                }
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onClick={() => handleJobClick(job, index)}
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
            {isLoading && (
              <div style={styles.chatMessage}><strong>Carrier Coach:</strong> Carrier Coach is writing...</div>
            )}
            <div ref={commentEndRef} />
          </div>
          <textarea placeholder="Add your comments here..." style={styles.textField} rows="4" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button style={styles.sendButton} onClick={handleSendComment}>Send</button>
        </div>
      </div>
      <div style={styles.preferencesPanel}>
        <div className="dropdownContainer">
          <div>
            <label>Work percentage:</label>
            <select name="work-percentage" style={styles.dropdown}>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
            </select>
          </div>
          <div>
            <label>Location:</label>
            <select name="location" style={styles.dropdown}>
              <option value="oslo">Oslo</option>
              <option value="bergen">Bergen</option>
              <option value="trondheim">Trondheim</option>
            </select>
          </div>
          <div>
            <label>Technologies:</label>
            <select name="technologies" style={styles.dropdown}>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="csharp">C#</option>
              <option value="react">React</option>
              <option value="sql">SQL</option>
            </select>
          </div>
          <button style={styles.sendButton} onClick={handleApplyPreferences}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
