import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import ShowHome from './ShowHome';
import SignUp from './SignUp';
import Favorites from './Favorites';
import ShowDetails from './ShowDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element={<ShowHome />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/show/:id" element={<ShowDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
