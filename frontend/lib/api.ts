import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshToken } from "./services/auth.service";

// Axios request config'e _retry özelliği eklemek için interface genişletme
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Bu satırı ekleyin
});

// Token yenileme durumunu takip etmek için
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: string | null) => void;
  reject: (reason?: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const { state } = JSON.parse(authStorage);
        const token = state.accessToken;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    } catch (error) {
      console.error("Request interceptor error:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Token yenileme mantığı eklendi
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // Eğer token yenileme işlemi devam ediyorsa, kuyruğa ekle
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Token yenileme işlemi
        const response = await refreshToken();
        const newAccessToken = response.accessToken;

        // Yeni token'ı localStorage'a kaydet
        const authStorage = localStorage.getItem("auth-storage");
        if (authStorage) {
          const storage = JSON.parse(authStorage);
          storage.state.accessToken = newAccessToken;
          localStorage.setItem("auth-storage", JSON.stringify(storage));
        }

        // Kuyruktaki istekleri işle
        processQueue(null, newAccessToken);
        
        // Orijinal isteği yeni token ile tekrar gönder
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return api(originalRequest);
        
      } catch (refreshError) {
        // Token yenileme başarısız, kullanıcıyı logout et
        processQueue(refreshError as AxiosError, null);
        
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
