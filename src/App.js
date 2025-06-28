import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SimplifyPage from './Simplify';
import RebuttalPage from './Rebuttal';
import ChatbotPage from './Chatbot';
import RiskScorePage from './Riskpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/simplify" element={<SimplifyPage />} /> 
        <Route path="/rebuttal" element={<RebuttalPage />} /> 
        <Route path="/chatbot" element={<ChatbotPage />} /> 
        <Route path="/risk-score" element={<RiskScorePage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
