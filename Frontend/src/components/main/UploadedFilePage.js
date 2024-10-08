// UploadedFilePage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UploadedFilePage = () => {
  const location = useLocation();
  const [fileUrl, setFileUrl] = useState(null);
  const fileName = location.state?.fileName || 'No file uploaded';
  const fileUrlReceived = location.state?.fileUrl;

  useEffect(() => {
    if (fileUrlReceived) {
      console.log('Setting file URL:', fileUrlReceived);
      setFileUrl(fileUrlReceived);
    } else {
      console.error('No file URL found');
    }
  }, [fileUrlReceived]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Uploaded File</h1>
      <p>File Name: {fileName}</p>
      {fileUrl && (
        <>
          <iframe
            src={fileUrl}
            title="Uploaded PDF"
            width="100%"
            height="600px"
            style={{ border: 'none' }}
          />
          <br />
          <a href={fileUrl} download={fileName} style={{ marginTop: '20px', display: 'inline-block', fontSize: '16px', color: '#007bff', textDecoration: 'underline' }}>
            Download File
          </a>
        </>
      )}
    </div>
  );
};

export default UploadedFilePage;
