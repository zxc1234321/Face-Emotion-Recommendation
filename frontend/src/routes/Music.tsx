import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Standard from '../components/Standard';

const Container = styled.div`
    padding: 20px 150px;
`;

const Music: React.FC = () => {
  return (
    <Container>
      <Header />
      <Standard endpoint="music" />
    </Container>
  );
};

export default Music;
