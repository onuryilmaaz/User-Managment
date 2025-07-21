import axios from "axios";

// Bu versiyonda Zustand import'una gerek yok.
// import { useAuthStore } from './hooks/use-auth.store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Zustand state'indeki zamanlama sorununu aşmak için token'ı doğrudan localStorage'dan oku
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const { state } = JSON.parse(authStorage);
        const token = state.accessToken;

        if (token) {
          // Eğer token varsa, Authorization başlığını isteğe ekle
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
    } catch (e) {
      console.error(
        "Token localStorage'dan okunamadı veya parse edilemedi.",
        e
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
