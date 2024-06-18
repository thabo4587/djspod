import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { FavoriteProvider } from './FavoriteContext';
import ShowHome from './ShowHome';
import SignUp from './SignUp';
import Favorites from './Favorites';
import ShowDetails from './ShowDetails';

function App() {
  return (
    <Router>
      <FavoriteProvider>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<ShowHome />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Routes>
      </FavoriteProvider>
    </Router>
  );
}

export default App;
