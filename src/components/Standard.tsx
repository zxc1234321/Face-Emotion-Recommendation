import styled from 'styled-components';

const Stand_span = styled.span`
  padding: 50px;
  text-align: center;
  border: 1px solid black;
`;

// 정보 나타내는 컴포넌트
export default function Standard() {
  return (
    <Stand_span>
      <h1>Hello World!</h1>
    </Stand_span>
  );
}
