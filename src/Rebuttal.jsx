import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import "./Rebuttal.css";
import ReactMarkDown from 'react-markdown'

const RebuttalPage = () => {
  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);
  const [rebuttal, setRebuttal] = useState(null);
  const [clauses, setClauses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!reason && !file) {
      alert("Please provide a reason or upload a rejection PDF.");
      return;
    }

    const form = new FormData();
    if (reason) form.append("reason", reason);
    if (file) form.append("pdf", file);
     setLoading(true);

    try {
      const res = await axios.post("https://clearclaim-backend.onrender.com/rebuttal", form);
      console.log("✅ Rebuttal response:", res.data);
      setRebuttal(res.data.rebuttal || "No rebuttal generated.");
      setClauses(res.data.matched_clauses || []);
      setError("");
    } catch (err) {
      console.error("❌ Backend error:", err);
      setError("Error generating rebuttal. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h2>✍️ Generate Rebuttal for Rejected Claim</h2>

      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Describe the rejection reason or your situation..."
        rows={4}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleSubmit}>
         {loading ? "Generating..." : "Generate Rebuttal"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {rebuttal && (
        <div className="result-box">
          <h3>🔍 Suggested Rebuttal</h3>
          <ReactMarkDown>{rebuttal}</ReactMarkDown>

          {clauses.length > 0 && (
            <>
              <h4>📄 Matched Clauses:</h4>
              <ul>
                {clauses.map((clause, index) => (
                  <li key={index}>{clause}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
      <a className="back" href="/">BACK TO HOME</a>
    </div>


  );
};

export default RebuttalPage;
