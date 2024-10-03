// import React from 'react';
// import { useSelector } from 'react-redux';
// import styled from 'styled-components';
// import CategoryItemWrapper from './CategoryItemWrapper';
// import MainHeader from './MainHeader';

// const HeaderWrapper = styled.div<{ isDarkMode: boolean }>`
//   width: 100%; /* Full width */
//   position: sticky;
//   top: 0;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? '#444445' : '#f5f5f5')};
//   z-index: 1000; /* Ensure it's above other content */
//   &:after {
//     content: '';
//     display: block;
//     width: 100%;
//     border-bottom: 2px solid
//       ${({ isDarkMode }) => (isDarkMode ? '#f5f5f5' : '#000')}; /* Dynamic border color */
//     position: absolute;
//     bottom: 0;
//     left: 0;
//   }
// `;

// const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px 20px; /* Side padding */
//   max-width: 1200px; /* Max width */
//   margin: 0 auto; /* Center alignment */
// `;

// const Category = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 15px; /* Gap between items */
// `;

// const Header: React.FC = () => {
//   const isDarkMode = useSelector((state: any) => state.darkMode);

//   return (
//     <HeaderWrapper isDarkMode={isDarkMode}>
//       <HeaderContainer>
//         <Category>
//           <CategoryItemWrapper text="Logo" />
//           <CategoryItemWrapper text="Books" />
//           <CategoryItemWrapper text="Drama" />
//           <CategoryItemWrapper text="Movie" />
//           <CategoryItemWrapper text="Music" />
//         </Category>
//         <MainHeader />
//       </HeaderContainer>
//     </HeaderWrapper>
//   );
// };

// export default Header;


import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CategoryItemWrapper from './CategoryItemWrapper';
import MainHeader from './MainHeader';

const HeaderWrapper = styled.div<{ $isDarkMode: boolean }>`
  width: 100%;
  position: sticky;
  top: 0;
  background-color: ${({ $isDarkMode }) =>
    $isDarkMode ? 'rgba(68, 68, 69, 0.8)' : 'rgba(245, 245, 245, 0.8)'};
  backdrop-filter: blur(10px); /* 블러 처리 */
  z-index: 1000;
  transition: background-color 0.3s ease; /* 스크롤할 때 부드러운 전환 */
  &:after {
    content: '';
    display: block;
    width: 100%;
    border-bottom: 2px solid
      ${({ $isDarkMode }) => ($isDarkMode ? '#f5f5f5' : '#000')}; /* Dynamic border color */
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  max-width: 1700px;
  margin: 0 auto;
`;

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Header: React.FC = () => {
  const isDarkMode = useSelector((state: any) => state.darkMode);
  
  console.log("isDarkMode 상태:", isDarkMode); // 상태 확인
  
  return (
    <HeaderWrapper $isDarkMode={isDarkMode}>
      <HeaderContainer>
        <Category>
          <CategoryItemWrapper text="Logo" />
          <CategoryItemWrapper text="Books" />
          <CategoryItemWrapper text="Drama" />
          <CategoryItemWrapper text="Movie" />
          <CategoryItemWrapper text="Music" />
        </Category>
        <MainHeader />
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
