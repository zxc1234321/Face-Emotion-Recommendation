import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Standard from '../components/Standard';
import { useSelector } from 'react-redux';

const Container = styled.div`
    padding: 20px 220px; /* 좌우 여백 설정 */
`;

const Books: React.FC = () => {
    return (
        <Container>
            <Header />
            <Standard />
        </Container>
    );
};

export default Books;
