import { registerAs } from '@nestjs/config';

export default registerAs('books', () => ({
  apiKey: process.env.GOOGLE_BOOKS_API_KEY,
}));
