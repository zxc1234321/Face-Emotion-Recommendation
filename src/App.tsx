import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './modules/Store';
import './assets/styles/Darkmode.css';
import Mainpage from './routes/Mainpage';
import Books from './routes/Books';
import { toggleDarkMode } from './modules/Actions';

const App: React.FC = () => {
  useEffect(() => {
    // 페이지 로드 시 저장된 다크 모드 상태를 가져와서 Redux 상태에 적용
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      store.dispatch(toggleDarkMode());
    }
  }, []);

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
