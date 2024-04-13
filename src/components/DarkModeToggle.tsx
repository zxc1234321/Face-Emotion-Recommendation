import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleDarkMode } from '../modules/Actions';

const ToggleSwitchWrapper = styled.label`
  display: inline-block;
  position: relative;
  width: 4.2em; /* 토글 스위치의 너비 조정 */
  height: 2em; /* 토글 스위치의 높이 조정 */
`;

const ToggleSwitchInput = styled.input`
  display: none;
`;

const ToggleSwitchButton = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightgray;
  border-radius: 2em; /* 토글 스위치 버튼의 둥근 모양을 위한 반지름 설정 */
  transition: background-color 0.4s ease;

  &:after {
    content: '🌚';
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 50%;
    background-color: white;
    border-radius: 50%;
    transition: all 0.4s ease;
  }

  ${ToggleSwitchInput}:checked + & {
    background-color: gray;

    &:after {
      content: '🌞';
      left: 50%;
    }
  }
`;

const ToggleSwitch: React.FC<{ isChecked: boolean; onChange: () => void }> = ({
  isChecked,
  onChange,
}) => {
  return (
    <ToggleSwitchWrapper>
      <ToggleSwitchInput
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <ToggleSwitchButton />
    </ToggleSwitchWrapper>
  );
};

const DarkModeToggle: React.FC = () => {
  const darkMode = useSelector((state: any) => state.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  useEffect(() => {
    // 페이지 로드 시 저장된 상태 불러오기
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      dispatch(toggleDarkMode()); // 저장된 상태가 있다면 다크 모드로 설정
    }
  }, []); // 빈 배열을 전달하여 이펙트가 한 번만 실행되도록 설정

  const handleToggle = () => {
    dispatch(toggleDarkMode());
    // 설정 변경 시 로컬 스토리지에 저장
    localStorage.setItem('darkMode', !darkMode ? 'true' : 'false');
  };

  return <ToggleSwitch isChecked={darkMode} onChange={handleToggle} />;
};

export default DarkModeToggle;
