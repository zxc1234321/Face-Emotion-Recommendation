import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter 대신 Routes, Route를 import합니다.
import Header from '../components/Header';
import ToggleSwitch from '../components/ToggleSwitch';
import Information from '../components/MovieDrama/Information';
import Author from '../components/MovieDrama/Author';
import Reaction from '../components/MovieDrama/Reaction';

const lightTheme = {
  body: '#ffffff',
  text: '#000000',
  border: '#000000',
};

const darkTheme = {
  body: '#1e1e1e',
  text: '#ffffff',
  border: '#ffffff',
};

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
  min-height: 100vh;
  padding: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 25px; /* ToggleSwitch를 왼쪽으로 이동시키기 위해 오른쪽 여백 추가 */
`;

const Movie = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppContainer>
        <Router>
          <HeaderContainer>
            <Header isDarkMode={isDarkMode} /> {/* 다크 모드 상태 전달 */}
            <ToggleSwitch isChecked={isDarkMode} onChange={toggleDarkMode} />
          </HeaderContainer>
          <Routes>
            <Route path="/Movie" element={<MovieDrama />} />
          </Routes>
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
};

const MovieDrama = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 창 너비 변경 이벤트 처리
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // 창 너비 변경 이벤트 리스너 추가
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        padding: '20px',
        display: 'grid',
        gridTemplateColumns:
          windowWidth < 600
            ? `repeat(auto-fit, minmax(100px, 1fr))`
            : 'repeat(2, 1fr)',
        gap: '40px',
      }}
    >
      <Information />
      <Author />
      <Reaction />
    </div>
  );
};

export default Movie;
