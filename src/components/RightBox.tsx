import React from 'react';
import styled from 'styled-components';

const RightBoxContainer = styled.div`
    border: 1px solid black;
    padding: 20px;
    border-radius: 5px;
    margin-left: auto; /* 자동으로 오른쪽으로 정렬 */
`;

const RightBoxContent = styled.div`
    color: black;
    font-size: 18px;
`;

const RightBox = () => {
    return (
        <RightBoxContainer>
            <RightBoxContent>
                This is the content of the right box.
            </RightBoxContent>
        </RightBoxContainer>
    );
};

export default RightBox;
