import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './_home/home.js';
import Login from './login/login.js';
import Answers from './answers/answers.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/answers" element={<Answers />} />
      </Routes>
    </Router>
  );
}

export default App;