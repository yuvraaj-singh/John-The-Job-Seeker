// UploadedFilePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const UploadedFilePage = () => {
  const location = useLocation();
  const fileName = location.state?.fileName || 'No file uploaded';

  return (
    <div style={{ padding: '20px' }}>
      <h1>Uploaded File</h1>
      <p>File Name: {fileName}</p>
    </div>
  );
};

export default UploadedFilePage;
