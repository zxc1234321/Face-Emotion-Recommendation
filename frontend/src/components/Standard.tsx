import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Book, Movie, Drama, Music } from '../modules/Types';

const Wrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: auto;
  height: auto;
  border-radius: 15px;
`;

const APIContainer = styled.div<{ isDarkMode: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 아이템을 한 줄에 배치 */
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 80%; /* 전체 너비를 조정 */
  border-radius: 15px;
  text-align: center;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ItemImage = styled.img`
  width: 150px;
  height: 200px;
  margin-bottom: 10px;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
`;

const ItemDetail = styled.p`
  font-size: 16px;
  text-align: center;
`;

interface StandardProps {
  endpoint: string;
  emotionResult: string;
}

const Standard: React.FC<StandardProps> = ({ endpoint, emotionResult }) => {
  const [apiResult, setApiResult] = useState<
    Book[] | Movie[] | Drama[] | Music[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const isDarkMode = false; // 이 부분은 실제 다크 모드 상태로 변경해야 합니다.

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(
          `Fetching data from endpoint: ${endpoint} with emotion: ${emotionResult}`
        );
        const response = await axios.get(
          `http://localhost:3000/emotion/${endpoint}?emotion=${emotionResult}`
        );

        console.log('API response:', response.data); // 응답 데이터 전체 확인용

        if (endpoint === 'books') {
          const items = response.data.filter(
            (item: Book) => item.volumeInfo?.imageLinks?.thumbnail
          );
          if (Array.isArray(items) && items.length > 0) {
            console.log('Books API response:', items); // 응답 데이터 확인용
            setApiResult(items);
          } else {
            console.error('No items found in API response');
          }
        } else if (endpoint === 'music') {
          const tracks = response.data.tracks.filter(
            (track: Music) => track.album.images.length > 0
          );
          if (Array.isArray(tracks) && tracks.length > 0) {
            setApiResult(tracks);
          } else {
            console.error('No tracks found in API response');
          }
        } else {
          const results = response.data.results.filter(
            (result: Movie | Drama) => result.poster_path
          );
          if (Array.isArray(results) && results.length > 0) {
            setApiResult(results);
          } else {
            console.error('No results found in API response');
          }
        }
        setError(null); // Reset error if fetch is successful
      } catch (error) {
        console.error('Error fetching API data:', error);
        setError('Failed to fetch API data');
        setApiResult([]);
      }
    };

    fetchData();
  }, [endpoint, emotionResult]);

  if (error) {
    return (
      <Wrapper isDarkMode={isDarkMode}>
        <APIContainer isDarkMode={isDarkMode}>
          <p>{error}</p>
        </APIContainer>
      </Wrapper>
    );
  }

  if (apiResult.length === 0) {
    return (
      <Wrapper isDarkMode={isDarkMode}>
        <APIContainer isDarkMode={isDarkMode}>
          <p>Loading...</p>
        </APIContainer>
      </Wrapper>
    );
  }

  return (
    <Wrapper isDarkMode={isDarkMode}>
      <APIContainer isDarkMode={isDarkMode}>
        {endpoint === 'books' &&
          (apiResult as Book[]).map((book: Book) => (
            <ItemContainer key={book.id}>
              <ItemImage
                src={
                  book.volumeInfo?.imageLinks?.thumbnail ||
                  'default_image_url_here'
                }
                alt={book.volumeInfo?.title || 'No title available'}
              />
              <ItemTitle>
                {book.volumeInfo?.title || 'No title available'}
              </ItemTitle>
              <ItemDetail>
                {book.volumeInfo?.authors?.join(', ') || 'No authors available'}
              </ItemDetail>
            </ItemContainer>
          ))}
        {endpoint === 'movie' &&
          (apiResult as Movie[]).map((movie: Movie) => (
            <ItemContainer key={movie.id}>
              <ItemImage
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <ItemTitle>{movie.title}</ItemTitle>
            </ItemContainer>
          ))}
        {endpoint === 'drama' &&
          (apiResult as Drama[]).map((tv: Drama) => (
            <ItemContainer key={tv.id}>
              <ItemImage
                src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
                alt={tv.name}
              />
              <ItemTitle>{tv.name}</ItemTitle>
            </ItemContainer>
          ))}
        {endpoint === 'music' &&
          (apiResult as Music[]).map((track: Music) => (
            <ItemContainer key={track.id}>
              <ItemImage src={track.album.images[0].url} alt={track.name} />
              <ItemTitle>{track.name}</ItemTitle>
              <ItemDetail>
                {track.artists.map((artist) => artist.name).join(', ')}
              </ItemDetail>
            </ItemContainer>
          ))}
      </APIContainer>
    </Wrapper>
  );
};

export default Standard;