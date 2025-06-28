import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SimplifyPage from './Simplify';
import RebuttalPage from './Rebuttal';
import VerifyPage from './verify.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/simplify" element={<SimplifyPage />} /> 
        <Route path="/rebuttal" element={<RebuttalPage />} /> 
        <Route path="/verify" element={<VerifyPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
