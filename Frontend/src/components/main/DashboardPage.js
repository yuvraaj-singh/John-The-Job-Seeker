// DashboardPage.js
import React, { useState } from 'react';

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
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100vh',
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
    color: '#007bff',  // Added this line to set the text color to #007bff
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
    borderRadius: '4px',
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
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

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
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.leftPanel}>
          <h2>Job List</h2>
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
          <h2>Improve CV</h2>
          <button style={styles.navButton}>Upload your CV</button>
          <button style={styles.navButton}>view CV</button>
          <div style={styles.card}>AI generated Summary of the CV</div>
          <div style={styles.chatButton}>chat/message</div>
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