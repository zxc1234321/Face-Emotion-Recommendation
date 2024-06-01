import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CategoryItemWrapper from './CategoryItemWrapper';
import DarkModeToggle from './DarkModeToggle';

const HeaderWrapper = styled.div<{ isDarkMode: boolean }>`
  width: 100%; /* Full width */
  position: sticky;
  top: 0;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#444445' : '#f5f5f5')};
  z-index: 1000; /* Ensure it's above other content */
  &:after {
    content: '';
    display: block;
    width: 100%;
    border-bottom: 2px solid
      ${({ isDarkMode }) => (isDarkMode ? '#f5f5f5' : '#000')}; /* Dynamic border color */
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px; /* Side padding */
  max-width: 1200px; /* Max width */
  margin: 0 auto; /* Center alignment */
`;

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* Gap between items */
`;

const Header: React.FC = () => {
  const isDarkMode = useSelector((state: any) => state.darkMode);

  return (
    <HeaderWrapper isDarkMode={isDarkMode}>
      <HeaderContainer>
        <Category>
          <CategoryItemWrapper text="Logo" />
          <CategoryItemWrapper text="Books" />
          <CategoryItemWrapper text="Drama" />
          <CategoryItemWrapper text="Movie" />
          <CategoryItemWrapper text="Music" />
        </Category>
        <DarkModeToggle />
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
