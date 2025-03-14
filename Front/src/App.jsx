import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import ProtegerRuta from './components/ProtegerRuta';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash" element={<ProtegerRuta> <Dashboard /> </ProtegerRuta> } />
        <Route path="/contact" element={<ProtegerRuta> <Contact /> </ProtegerRuta> } />
      </Routes>
    </Router>
  );
}

export default App;