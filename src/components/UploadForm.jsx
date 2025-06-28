import React, { useState } from 'react';
import axios from 'axios';

function UploadForm({ setResults, setLoading }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/simplify-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResults(response.data);
    } catch (err) {
      alert('Error contacting backend. Is it running?');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload & Simplify</button>
    </form>
  );
}

export default UploadForm;
