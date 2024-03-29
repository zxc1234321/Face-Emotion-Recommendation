import React, { useState } from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Standard from './components/Standard';
import ToggleSwitch from './components/ToggleSwitch';

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

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 현재 창 너비 상태

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 창 너비 변경 이벤트 처리
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // 창 너비 변경 이벤트 리스너 추가
  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppContainer>
        <HeaderContainer>
          <Header isDarkMode={isDarkMode} /> {/* 다크 모드 상태 전달 */}
          <ToggleSwitch isChecked={isDarkMode} onChange={toggleDarkMode} />
        </HeaderContainer>
        <div style={{ 
          padding: '20px', 
          display: 'grid', 
          gridTemplateColumns: windowWidth < 600 ? `repeat(auto-fit, minmax(100px, 1fr))` : 'repeat(2, 1fr)', 
          gap: '40px' 
          }}>
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
