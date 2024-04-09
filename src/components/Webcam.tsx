import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const VideoContainer = styled.div`
    position: relative;
    width: 750px;
    height: 500px;
    margin: 0 auto;
    border: 2px solid ${props => props.isDarkMode ? '#fff' : '#000'}; /* Dark Mode일 때 border 색 변경 */
`;

const Video = styled.video`
    width: 100%;
    height: auto;
    display: block;
`;

const Canvas = styled.canvas`
    width: 100%;
    height: auto;
    display: block;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const Button = styled.button`
    margin: 0 10px;
    padding: 12px 22px;
    background-color: ${props => props.disabled ? '#ccc' : '#FF6347'};
    color: white;
    font-size: 16px;
    font-family: 'LINESeedKR-Bd', sans-serif;
    border: none;
    border-radius: 12px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        background-color: ${props => props.disabled ? '#ccc' : '#FF4500'};
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

const Webcam = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isWebcamAvailable, setIsWebcamAvailable] = useState(true);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const isDarkMode = useSelector((state: any) => state.darkMode);

    useEffect(() => {
        const checkWebcamAvailability = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setIsWebcamAvailable(true);
                }
            } catch (error) {
                console.error('Error accessing webcam:', error);
                setIsWebcamAvailable(false);
            }
        };

        if (!isButtonClicked) {
            checkWebcamAvailability();
        }
    }, [isButtonClicked]);

    const takePicture = () => {
        // 사진 찍기 로직
    };

    const retakePicture = () => {
        // 다시 찍기 로직
    };

    const seeResult = () => {
        // 결과 보기 로직
    };

    return (
        <div>
            <VideoContainer isDarkMode={isDarkMode}>
                <Video ref={videoRef} autoPlay />
                <Canvas ref={canvasRef} style={{ display: 'none' }} />
            </VideoContainer>
            <ButtonContainer>
                <Button
                    onClick={() => setIsButtonClicked(true)}
                    disabled={!isWebcamAvailable || isButtonClicked}
                >
                    웹캠 연결
                </Button>
                {!isWebcamAvailable && (
                    <p style={{ color: '#ff0000', textAlign: 'center' }}>
                        **카메라를 지원하지 않는 환경입니다**
                    </p>
                )}
            </ButtonContainer>
            {isWebcamAvailable && (
                <ButtonContainer>
                    <Button onClick={takePicture}>사진 찍기</Button>
                </ButtonContainer>
            )}
            {isWebcamAvailable && (
                <ButtonContainer>
                    <Button onClick={retakePicture}>다시 찍기</Button>
                    <Button onClick={seeResult}>결과 보기</Button>
                </ButtonContainer>
            )}
        </div>
    );
};

export default Webcam;
