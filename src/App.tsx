import './App.css';
import styled from 'styled-components';
import Header from './components/Header';
import Standard from './components/Standard';

const HeaderDiv = styled.div`
  margin-bottom: 20px; /* 헤더와의 간격 조정 */
`;

const BodyDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개의 컬럼으로 분할 */
  gap: 20px; /* 각 컴포넌트 간의 간격 조정 */
`;

function App() {
  return (
    <div>
      <HeaderDiv>
        <Header />
      </HeaderDiv>
      <BodyDiv>
        <Standard />
        <Standard />
        <Standard />
        <Standard />
      </BodyDiv>
    </div>
  );
}

export default App;
