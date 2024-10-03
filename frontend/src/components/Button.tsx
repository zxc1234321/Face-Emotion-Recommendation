import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import RootState from '../modules/RootState';

const Button: React.FC = () => {
    const isDarkMode = useSelector((state: RootState) => state.darkMode); // 다크 모드 상태 가져오기

    return (
        <div>
            <LogoutBtn isDarkMode={isDarkMode}>
                <a href="/">로그아웃</a>
            </LogoutBtn>
        </div>
    )
}

const LogoutBtn = styled.button<{ isDarkMode: boolean }>`
    background-color: ${({ isDarkMode }) => (isDarkMode ? 'gray' : 'lightgray')};
    border-radius: 25px;
    border: none;
    width: 80px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        text-decoration: none;
        font-size: 14px;
        color: ${({ isDarkMode }) => (isDarkMode ? '#f5f5f5' : '#333333')};
    }

    &:hover {
        background-color: ${({ isDarkMode }) => (isDarkMode ? '#777777' : '#999999')};
        transition: 0.1s ease-in;

        a {
            color: white;
        }
    }
`

export default Button;
