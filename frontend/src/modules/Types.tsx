export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

export interface Movie {
  id: string;
  title: string;
  poster_path: string;
}

export interface Drama {
  id: string;
  name: string;
  poster_path: string;
}

export interface Music {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
}
