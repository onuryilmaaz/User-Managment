import axios from "axios";
// InputSanitizer import'unu kaldır
// import { InputSanitizer } from "@/lib/security/sanitize";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (sanitization kısmını kaldır)
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

      // Input sanitization kısmını kaldır
      // if (config.data) {
      //   config.data = InputSanitizer.sanitizeObject(config.data);
      // }

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

// Response interceptor (mevcut)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz, kullanıcıyı login sayfasına yönlendir
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
