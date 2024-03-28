import React, { useState } from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Standard from './components/Standard';

// 다크 모드와 라이트 모드에 대한 테마 설정
const lightTheme = {
  body: '#ffffff',
  text: '#000000',
  border: '#000000', // 테두리 색
};

const darkTheme = {
  body: '#1e1e1e',
  text: '#ffffff',
  border: '#ffffff', // 다크 모드에서 테두리 색을 하얗게 설정
};

// 테마 스위치 버튼 스타일
const ThemeSwitchButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5); // 반투명 배경색 적용
  border: 2px solid ${({ theme }) => theme.border}; // 테두리 스타일 적용
  border-radius: 25px; // 테두리 반경 설정
  font-size: 20px; // 글꼴 크기 설정
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; // 전환 효과 추가
`;

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
  height: 100vh; /* 화면 전체 높이 */
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 다크 모드 토글 함수
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppContainer>
        <ThemeSwitchButton onClick={toggleDarkMode}>
          {isDarkMode ? '🌞' : '🌝'}
        </ThemeSwitchButton>
        <Header />
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {/* 표시할 내용 */}
          <Standard />
          <Standard />
          <Standard />
          <Standard />
        </div>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
