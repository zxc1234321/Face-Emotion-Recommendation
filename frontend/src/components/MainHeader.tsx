import DarkModeToggle from './DarkModeToggle';
import Button from './Button';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: space-between; /* 공간을 균등하게 분배하고 싶을 때 사용 가능 */
  gap: 1rem; /* 버튼과 다크 모드 토글 사이 간격 추가 */
`;

const MainHeader = () => {
    return (
        <HeaderWrapper>
            <Button />
            <DarkModeToggle />
        </HeaderWrapper>
    );
}

export default MainHeader;
