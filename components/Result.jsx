import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Result.css';
import axios from 'axios';

export default function Result() {
  const { id } = useParams();
  const savedData = JSON.parse(localStorage.getItem('resultData') || '{}');
  const [resume, setResume] = useState(savedData.resume || '');
  const [coverLetter, setCoverLetter] = useState(savedData.coverLetter || '');
  const [submissionId, setSubmissionId] = useState(savedData.submissionId || id);
  const [loading, setLoading] = useState(!resume || !coverLetter);

  useEffect(() => {
    if ((!resume || !coverLetter) && submissionId) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/submissions/${submissionId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.data)
          setResume(response.data.data.resume);
          setCoverLetter(response.data.data.coverLetter);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching result:', error);
        }
      };
      fetchData();
    }
  }, []);

  const handleDownload = async (type) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/submissions/${submissionId}/download?type=${type}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="result-wrapper">
      <div className="result-header">
        <h2 className='result-h2'>Your Resume & Cover Letter</h2>
        <p>Here are your AI-generated documents. Download and use them with confidence!</p>
      </div>

      {loading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <div className="result-content">
          <div className="result-block">
            <h3 className='result-h3'>Resume</h3>
            <pre className="output-box">{resume}</pre>
            <button onClick={() => handleDownload('resume')} className="download-btn">Download Resume</button>
          </div>

          <div className="result-block">
            <h3 className='result-h3'>Cover Letter</h3>
            <pre className="output-box">{coverLetter}</pre>
            <button onClick={() => handleDownload('coverLetter')} className="download-btn">Download Cover Letter</button>
          </div>
        </div>
      )}
    </div>
  );
}
