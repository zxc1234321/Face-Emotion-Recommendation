import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
// 기본 이미지 파일
import bookSparkles from '../assets/book-sparkles-svgrepo-com.svg';
import clapperboard from '../assets/clapperboard-svgrepo-com.svg';
import filmAlt from '../assets/film-alt-svgrepo-com.svg';
import music from '../assets/music-svgrepo-com.svg';
// 추가: 다크 모드용 이미지 파일
import bookWhite from '../assets/book_white.svg';
import clapperWhite from '../assets/clapperboard_white.svg';
import filmWhite from '../assets/film_white.svg';
import musicWhite from '../assets/music_white.svg';

const Category = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CategoryItem = styled.div`
  position: relative;
`;

const CategoryLink = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  margin: 20px;
  transition: all 0.3s ease;
  flex-basis: calc(25% - 60px);
  max-width: calc(25% - 60px);
  text-align: center;
  background-size: contain;
  background-position: center;
  height: 60px;
  width: 60px;
  cursor: pointer;
`;

const Text = styled.div`
  position: absolute;
  bottom: 80%;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const MusicText = styled(Text)`
  left: calc(50% + 5px); /* 텍스트를 오른쪽으로 살짝만 이동 */
`;

const CategoryItemWrapper = ({ children, text, isDarkMode }) => {
  const [showText, setShowText] = useState(false);

  return (
    <CategoryItem
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <CategoryLink>
        {/* 다크 모드일 때 해당하는 다크 모드 이미지 출력 */}
        {isDarkMode ? (
          <>
            {text === 'Books' && (
              <img src={bookWhite} alt="Books" width="60" height="60" />
            )}
            {text === 'Drama' && (
              <img src={clapperWhite} alt="Drama" width="60" height="60" />
            )}
            {text === 'Movie' && (
              <img src={filmWhite} alt="Movie" width="60" height="60" />
            )}
            {text === 'Music' && (
              <img src={musicWhite} alt="Music" width="60" height="60" />
            )}
          </>
        ) : (
          /* 라이트 모드일 때 기본 이미지 출력 */
          <>
            {text === 'Books' && (
              <img src={bookSparkles} alt="Books" width="60" height="60" />
            )}
            {text === 'Drama' && (
              <img src={clapperboard} alt="Drama" width="60" height="60" />
            )}
            {text === 'Movie' && (
              <img src={filmAlt} alt="Movie" width="60" height="60" />
            )}
            {text === 'Music' && (
              <img src={music} alt="Music" width="60" height="60" />
            )}
          </>
        )}
      </CategoryLink>
      {text === 'Music' ? (
        <MusicText style={{ opacity: showText ? 1 : 0 }}>{text}</MusicText>
      ) : (
        <Text style={{ opacity: showText ? 1 : 0 }}>{text}</Text>
      )}
    </CategoryItem>
  );
};

export default function Header({ isDarkMode }) {
  return (
    <Category>
      {/* 다크 모드 상태 전달 */}
      <CategoryItemWrapper  text="Books" isDarkMode={isDarkMode} />
      <CategoryItemWrapper text="Drama" isDarkMode={isDarkMode} />
      <CategoryItemWrapper text="Movie" isDarkMode={isDarkMode} />
      <CategoryItemWrapper text="Music" isDarkMode={isDarkMode} />
    </Category>
  );
}