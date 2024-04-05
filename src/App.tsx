import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Books from './routes/Books';
import Drama from './routes/Drama';
import Movie from './routes/Movie';
import Music from './routes/Music';
import Intro from './routes/Intro'; // Intro 컴포넌트를 import합니다.

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/Drama" element={<Drama />} />
        <Route path="/Music" element={<Music />} />
        <Route path="/Movie" element={<Movie />} />
      </Routes>
    </Router>
  );
};

export default App;
