import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60 * 8 * 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
