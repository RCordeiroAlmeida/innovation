import { useAuthStore } from '@/store/useAuthState';
import axios, { InternalAxiosRequestConfig } from 'axios';

const baseURL: string = process.env.NEXT_PUBLIC_API_URL || '';


export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const auth = useAuthStore.getState();
    let token = auth.token;

    // Log para ver se o Zustand já resgatou o token
    console.log("Token no Zustand:", token);

    if (!token && typeof window !== 'undefined') {
      const storage = localStorage.getItem('auth-storage');
      if (storage) {
        const parsed = JSON.parse(storage);
        token = parsed.state?.token;
        console.log("Token recuperado do LocalStorage:", token);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }

    console.log("Headers Finais:", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);