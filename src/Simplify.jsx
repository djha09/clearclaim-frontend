import React, { useState } from "react";
import axios from "axios";
import ReactMarkDown from 'react-markdown'
import './simplify.css'
import './index.css'

const SimplifyPage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post("https://clearclaim-backend.onrender.com/simplify_pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.summary) {
        setResult(response.data.summary);
      } else {
        setError("No simplified content received.");
      }
    } catch (err) {
      console.error("❌ Error simplifying PDF:", err);
      setError("Failed to simplify PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="simplify-container">
      <h2 >Simplify Your Insurance Policy</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Simplifying..." : "Upload & Simplify"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className=".result-area">
          <h3 className="resultTitle">📝 Simplified Summary:</h3>
          <ReactMarkDown className="resultText">{result}</ReactMarkDown>
        </div>
      )}


      <a className="back" href="/">BACK TO HOME</a>
    </div>
  );
};

export default SimplifyPage;
