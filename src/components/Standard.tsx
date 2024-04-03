import styled from 'styled-components';

const Stand_span = styled.span`
  padding: 50px;
  text-align: center;
  border: 1px solid black;
`;

interface StandardProps {
  content: string;
}

export default function Standard({ content }: StandardProps) {
  return (
    <Stand_span>
      <h1>{content}</h1>
    </Stand_span>
  );
}
