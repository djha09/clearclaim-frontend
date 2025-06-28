import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import "./Rebuttal.css";
import ReactMarkDown from 'react-markdown'

const VerifyPage = () => {
  const [claim, setClaim] = useState("");
  const [file, setFile] = useState(null);
  const [verifier, setVerifier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!claim || !file) {
      alert("Please provide both the agent's claim and the policy document.");
      return;
    }

    const form = new FormData();
    form.append("claim", claim);
    form.append("pdf", file);
    setLoading(true);
    setVerifier(null);
    setError("");

    try {
      const res = await axios.post("https://clearclaim-backend.onrender.com/verify", form);
      console.log("✅ Verifier response:", res.data);
      setVerifier(res.data.verify || "No verification result returned.");
    } catch (err) {
      console.error("❌ Backend error:", err);
      setError("Error verifying the claim. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>✅ Verify What the Agent Said</h2>

      <textarea
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        placeholder="e.g., Agent said room rent is fully covered..."
        rows={4}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleSubmit}>
        {loading ? "Verifying..." : "Verify"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {verifier && (
        <div className="result-box">
          <h3>📋 Verification Result</h3>
          <ReactMarkDown>{verifier}</ReactMarkDown>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
