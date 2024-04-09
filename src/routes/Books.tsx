import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const Container = styled.div`
    padding: 20px 220px; /* 좌우 여백 설정 */
`;

const Books: React.FC = () => {
    return (
        <Container>
            <Header />
        </Container>
    );
};

export default Books;
