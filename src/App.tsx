import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router v6에서는 Routes를 사용합니다.
import { Provider } from 'react-redux';
import store from './modules/Store';
import './assets/styles/Darkmode.css';
import Mainpage from './routes/Mainpage';
import Books from './routes/Books';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/books" element={<Books />} />
            <Route path="/" element={<Mainpage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
