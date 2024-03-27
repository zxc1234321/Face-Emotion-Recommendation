import styled from 'styled-components';

const Category = styled.div`
  padding: 30px;
  font-size: 22px;
  justify-content: space-between;
`;

const CategoryLink = styled.a`
  text-decoration: none; // 링크 밑줄 제거
  color: inherit; // 부모 요소의 color 상속
  font-weight: bold;
  margin: 30px; // 카테고리 마다 간격 조절
`;

export default function Header() {
  return (
    <Category>
      <span>
        <CategoryLink href="#">BOOKS</CategoryLink>
        <CategoryLink href="#">DRAMA</CategoryLink>
        <CategoryLink href="#">MOVIE</CategoryLink>
        <CategoryLink href="#">MUSIC</CategoryLink>
      </span>
    </Category>
  );
}
