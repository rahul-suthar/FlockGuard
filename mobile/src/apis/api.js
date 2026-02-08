import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FARM_API_URL } from '@env';

const api = axios.create({
  baseURL: FARM_API_URL,
});

api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Token retrieval failed', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
