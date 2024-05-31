import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Standard from '../components/Standard';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  padding: 20px 150px; /* 좌우 여백 설정 */
`;

const Books: React.FC = () => {
  const location = useLocation();
  const emotion = location.state?.emotion || 'happiness'; // 기본 값으로 'happiness' 사용

  return (
    <Container>
      <Header />
      <Standard endpoint="books" emotion={emotion} />
    </Container>
  );
};

export default Books;
