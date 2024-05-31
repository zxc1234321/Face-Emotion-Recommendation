import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/Header';
import Standard from '../components/Standard';
import { RootState } from '../modules/Types';

const Container = styled.div`
  padding: 20px 150px;
`;

const Drama: React.FC = () => {
  const navigate = useNavigate();
  const emotionResult = useSelector((state: RootState) => state.emotionResult);

  useEffect(() => {
    if (!emotionResult) {
      console.error('No emotion result provided!');
      navigate('/'); // 기본 페이지로 리디렉션하거나 오류 페이지로 리디렉션
    } else {
      console.log('Emotion Result:', emotionResult); // 디버깅을 위한 로그
    }
  }, [emotionResult, navigate]);

  if (!emotionResult) {
    return <p>Loading...</p>; // 감정 결과가 없으면 로딩 메시지 표시
  }

  return (
    <Container>
      <Header />
      <Standard endpoint="drama" emotionResult={emotionResult} />
    </Container>
  );
};

export default Drama;
