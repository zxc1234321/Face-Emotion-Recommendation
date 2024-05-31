import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 2px solid ${(props) => (props.isDarkMode ? '#fff' : '#000')};
  width: auto;
  height: 1500px;
  border-radius: 15px;
`;

const APIContainer = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border: 2px solid ${(props) => (props.isDarkMode ? '#fff' : '#000')};
  width: 650px;
  height: 650px;
  border-radius: 15px;
  text-align: center;
`;

interface StandardProps {
  endpoint: string;
  emotionResult: string;
}

const Standard: React.FC<StandardProps> = ({ endpoint, emotionResult }) => {
  const [apiResult, setApiResult] = useState<any>(null);
  const isDarkMode = false; // 이 부분은 실제 다크 모드 상태로 변경해야 합니다.

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(
          `Fetching data from endpoint: ${endpoint} with emotion: ${emotionResult}`
        );
        const response = await axios.get(
          `http://localhost:3000/emotion/${endpoint}?emotion=${emotionResult}`
        );
        setApiResult(response.data);
      } catch (error) {
        console.error('Error fetching API data:', error);
        setApiResult({ error: 'Failed to fetch API data' });
      }
    };

    fetchData();
  }, [endpoint, emotionResult]);

  if (!apiResult) {
    return (
      <Wrapper isDarkMode={isDarkMode}>
        <APIContainer isDarkMode={isDarkMode}>
          <p>Loading...</p>
        </APIContainer>
      </Wrapper>
    );
  }

  return (
    <Wrapper isDarkMode={isDarkMode}>
      <APIContainer isDarkMode={isDarkMode}>
        {apiResult.error ? (
          <pre>{JSON.stringify(apiResult.error, null, 2)}</pre>
        ) : (
          <pre>{JSON.stringify(apiResult, null, 2)}</pre>
        )}
      </APIContainer>
    </Wrapper>
  );
};

export default Standard;
