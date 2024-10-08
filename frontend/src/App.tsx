import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './modules/Store';
import './assets/styles/Darkmode.css';
import Mainpage from './pages/Mainpage';
import Books from './pages/Books';
import Drama from './pages/Drama';
import Movie from './pages/Movie';
import Music from './pages/Music';
import Login from './pages/Login';
import Sign_Up from './pages/Sign_Up';
import Webcam from './components/Webcam'; // Webcam 컴포넌트 임포트
import Loading from './components/Loading'; // 로딩 컴포넌트 임포트
import { toggleDarkMode } from './modules/Actions';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 페이지 로드 시 저장된 다크 모드 상태를 가져와서 Redux 상태에 적용
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      store.dispatch(toggleDarkMode());
    }

    // 2초 후에 로딩 상태 변경
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  // 로딩 중일 때 로딩 컴포넌트를 보여줌
  if (loading) {
    return (
      <Provider store={store}>
        <Loading />
      </Provider>
    );
  }

  // 로딩이 완료된 후에는 라우트를 렌더링
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/sign_up" element={<Sign_Up />}></Route>
            <Route path="/books" element={<Books />} />
            <Route path="/drama" element={<Drama />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/music" element={<Music />} />
            <Route path="/webcam" element={<Webcam />} />{' '}
            {/* 새로운 라우트 추가 */}
            <Route path="/main" element={<Mainpage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
