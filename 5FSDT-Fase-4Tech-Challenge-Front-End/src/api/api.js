import axios from 'axios';
import Constants from 'expo-constants';

const BASE = Constants.manifest?.extra?.BASE_URL || 'http://192.168.0.100:3000'; // use seu IP local

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  config => {
    // Pegando token do global ou de outra fonte
    if (global.authToken) {
      config.headers.Authorization = `Bearer ${global.authToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
