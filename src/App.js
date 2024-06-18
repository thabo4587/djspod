import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import ShowHome from './Home';
import SignUp from './SignUp';
import Favorites from './Favorites'; // Import your Favorites component
import ShowDetails from './ShowDetails'; // Import your ShowDetails component

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
