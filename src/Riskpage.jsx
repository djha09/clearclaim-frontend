import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const RiskScorePage = () => {
  const [formData, setFormData] = useState({ age: "", preexisting: false, amount: "", hospitalization: "standard" });
  const [score, setScore] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/risk_score", formData);
      setScore(res.data.risk_score);
    } catch (err) {
      alert("Failed to calculate risk score.");
    }
  };

  return (
    <div className="page-container">
      <h2>📊 Claim Risk Score Estimator</h2>
      <label>Age: <input type="number" name="age" value={formData.age} onChange={handleChange} /></label>
      <label>Pre-existing Conditions: <input type="checkbox" name="preexisting" checked={formData.preexisting} onChange={handleChange} /></label>
      <label>Claim Amount: <input type="number" name="amount" value={formData.amount} onChange={handleChange} /></label>
      <label>Hospitalization Type:
        <select name="hospitalization" value={formData.hospitalization} onChange={handleChange}>
          <option value="standard">Standard</option>
          <option value="daycare">Day Care</option>
          <option value="domiciliary">Domiciliary</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Get Risk Score</button>

      {score !== null && (
        <div className="result-box">
          Your Claim Risk Score is: <b>{score}</b>/100
        </div>
      )}
    </div>
  );
};

export default RiskScorePage;
