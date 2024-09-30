const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const headers = {
    Authorization:
      'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const data = qs.stringify({ grant_type: 'client_credentials' });

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    console.log('Access Token:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify access token:', error);
  }
}

getSpotifyToken();
