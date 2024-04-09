import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import DarkModeToggle from '../components/DarkModeToggle';
import Logo from '../assets/svg/logo.svg';
import LogoWhite from '../assets/svg/logo_white.svg';
import Webcam from '../components/Webcam';

// 전체를 감싸는 div
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 95vh;
`;

// 로고
const LogoImg = styled.img`
    width: 200px; // 너비
    margin-bottom: 60px; // 여백
`;

const DarkModeContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

function Mainpage() {
    const isDarkMode = useSelector((state: any) => state.darkMode);

    return (
        <Container>
            <Link to="/">
            <LogoImg src={isDarkMode ? LogoWhite : Logo} alt="logo" /> {/* 로고 이미지를 다크모드에 따라 변경 */}
            </Link>
            <Webcam />
            <DarkModeContainer>
                <DarkModeToggle />
            </DarkModeContainer>
        </Container>
    );
}

export default Mainpage;
