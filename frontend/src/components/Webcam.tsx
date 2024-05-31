import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface RootState {
  darkMode: boolean;
}

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isWebcamAvailable, setIsWebcamAvailable] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isPictureTaken, setIsPictureTaken] = useState(false);
  const [showWebcamMessage, setShowWebcamMessage] = useState(false);
  const isDarkMode = useSelector((state: RootState) => state.darkMode);

  useEffect(() => {
    const checkWebcamAvailability = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsWebcamAvailable(true);
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
        setIsWebcamAvailable(false);
        setShowWebcamMessage(true);
      }
    };

    if (isButtonClicked) {
      checkWebcamAvailability();
    }
  }, [isButtonClicked]);

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setIsPictureTaken(true);
        video.pause();
      }
    }
  };

  const retakePicture = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPictureTaken(false);
    }
  };

  const seeResult = async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        throw new Error('Canvas element not found');
      }

      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error('Failed to convert canvas to blob');
        }

        const formData = new FormData();
        formData.append('image', blob, 'uploaded_image.jpg');

        const response = await fetch('http://localhost:3000/webcam/analyze', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to upload image: ${errorText}`);
        }

        const result = await response.json();
        console.log('Image uploaded successfully', result);

        // 분석 결과를 Redux 스토어에 저장
        dispatch({ type: 'SET_ANALYSIS_RESULT', payload: result });

        // 분석 결과 페이지로 이동
        navigate('/books', { state: { emotion: result.emotion } }); // 예시로 music 페이지로 이동하도록 함
      }, 'image/jpeg');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <VideoContainer isDarkMode={isDarkMode}>
        <Video ref={videoRef} autoPlay />
        <Canvas
          ref={canvasRef}
          style={{ display: isPictureTaken ? 'block' : 'none' }}
        />
      </VideoContainer>
      <ButtonContainer>
        {!isWebcamAvailable && !showWebcamMessage && (
          <Button onClick={() => setIsButtonClicked(true)}>웹캠 연결</Button>
        )}
        {isWebcamAvailable && !isPictureTaken && (
          <Button onClick={takePicture}>사진 찍기</Button>
        )}
        {isPictureTaken && (
          <>
            <Button onClick={retakePicture}>다시 찍기</Button>
            <Button onClick={seeResult}>결과 보기</Button>
          </>
        )}
      </ButtonContainer>
      {showWebcamMessage && (
        <p style={{ color: '#ff0000', textAlign: 'center' }}>
          카메라를 지원하지 않는 환경이거나 권한이 거부되었습니다
        </p>
      )}
    </div>
  );
};

const VideoContainer = styled.div<{ isDarkMode: boolean }>`
  position: relative;
  width: 750px;
  height: 500px;
  margin: 0 auto;
  border: 2px solid ${(props) => (props.isDarkMode ? '#fff' : '#000')};
  overflow: hidden;

  ${(props) =>
    props.isDarkMode &&
    css`
      border-color: #fff;
    `}
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Canvas = styled.canvas`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 12px 22px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#FF6347')};
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#FF4500')};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export default Webcam;
