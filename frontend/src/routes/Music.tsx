import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Standard from '../components/Standard';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  padding: 20px 150px;
`;

const Music: React.FC = () => {
  const location = useLocation();
  const emotion = location.state?.emotion || 'neutral'; // 기본값으로 'neutral' 설정

  return (
    <Container>
      <Header />
      <Standard endpoint="music" emotion={emotion} />
    </Container>
  );
};

export default Music;
