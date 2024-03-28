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
  height: 100vh;
`;

const ToggleSwitchWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
`;

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppContainer>
        <ToggleSwitchWrapper>
          <ToggleSwitch isChecked={isDarkMode} onChange={toggleDarkMode} />
        </ToggleSwitchWrapper>
        <Header />
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
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