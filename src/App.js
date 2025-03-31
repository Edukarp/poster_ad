/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './_home/home.js';
import Login from './login/login.js';
import Answers from './answers/answers.js';

function App() {
  const isAuthenticated = localStorage.getItem("authToken");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/answers" element={isAuthenticated ? <Answers /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;