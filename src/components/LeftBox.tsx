import React from 'react';
import styled from 'styled-components';

const ParentContainer = styled.div`
    display: flex;
`;

const LeftBoxContainer = styled.div`
    width: 200px; /* 왼쪽 요소의 고정 너비 */
    border: 1px solid black;
    padding: 20px;
    border-radius: 5px;
`;

const LeftBoxContent = styled.div`
    color: black;
    font-size: 18px;
`;


const LeftAndRightBoxes = () => {
    return (
        <ParentContainer>
            <LeftBoxContainer>
                <LeftBoxContent>
                    This is the content of the left box.
                </LeftBoxContent>
            </LeftBoxContainer>
        </ParentContainer>
    );
};

export default LeftAndRightBoxes;
