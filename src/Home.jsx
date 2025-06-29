import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <h1>🛡️ClearClaim</h1>
        {/* <p>Master Your Policy, Verify Every Detail, Dispute with Confidence, and Get Help in an Instant!</p> */}
        {/* <div className="hero-buttons">
          <a href="/simplify" className="btn">Simplify Policy</a>
          <a href="/rebuttal" className="btn">Generate Rebuttal</a>
          <a href="/verify" className="btn">Verify Your Claim</a>
        </div> */}
      </header>

          <section className="about">
        <p className="about-text">
          Master Your Policy, Verify Every Detail, Dispute with Confidence, and Get Help in an Instant!
        </p>
      </section>
      
      <section className="features">
        <h2>📌 Our Core Features</h2>
        <div className="feature-cards">
          <div className="card">
            
            <h3>📄 Simplify Insurance</h3>
            <p>Upload your insurance policy PDF and get an easy-to-read summary in seconds.</p>
            <a href="/simplify" className="card-btn">Simplify →</a>
          </div>
          <div className="card">
            <h3>📝 Rebuttal Generator</h3>
            <p>Denied a claim? Upload your rejection letter and let AI draft a strong rebuttal.</p>
            <a href="/rebuttal" className="card-btn">Generate →</a>
          </div>
          <div className="card">
            <h3>✅ Claim Verifying</h3>
            <p>Unsure about the agent’s explanation? Verify the details and ensure everything adds up</p>
            <a href="/verify" className="card-btn">Verify →</a>
          </div>
          
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 ClearClaim. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
