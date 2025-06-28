import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  return (
    <div className="page-container">
      <h1>Welcome to ClearClaim 🚀</h1>
      <p>Empowering you to simplify your policy, fight claim denials, and get insurance help instantly.</p>

      <div className="card-grid">
        <div className="card">
          <h3>Simplify Your Claim</h3>
          <p>Check what your Claim covers and be Future proof.</p>
          <Link to="/simplify"><button>Try Now</button></Link>
        </div>

        <div className="card">
          <h3>✍️ Generate Rebuttal</h3>
          <p>Upload a rejection letter or type your reason to get a strong rebuttal.</p>
          <Link to="/rebuttal"><button>Start Rebuttal</button></Link>
        </div>

        {/* <div className="card">
          <h3>🤖 Insurance Chatbot</h3>
          <p>Ask questions about your insurance plan or upload your PDF to get answers.</p>
          <Link to="/chatbot"><button>Ask Now</button></Link>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
