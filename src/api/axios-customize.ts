import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const customFetch = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default customFetch;
