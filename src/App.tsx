import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Movie from './routes/Movie';
import Intro from './routes/Intro'; // Intro 컴포넌트를 import합니다.

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Movie" element={<Movie />} />
        <Route path="/" element={<Intro />} />
      </Routes>
    </Router>
  );
};

export default App;
