import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ Mude para o IP REAL do seu computador ou domínio da API
const API_BASE_URL = 'http://192.168.0.240:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para anexar o token JWT em todas as requisições
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
