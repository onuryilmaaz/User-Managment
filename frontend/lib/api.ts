import axios from "axios";
// useAuthStore import'unu kaldırıyoruz çünkü kullanılmıyor
import { CSRFProtection } from "@/lib/security/csrf";
import { InputSanitizer } from "@/lib/security/sanitize";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (mevcut)
api.interceptors.request.use(
  (config) => {
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const { state } = JSON.parse(authStorage);
        const token = state.accessToken;

        if (token) {
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

// Request interceptor - CSRF token ve sanitization ekle
api.interceptors.request.use(
  async (config) => {
    // Access token ekle
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // CSRF token ekle
    try {
      const csrfHeaders = await CSRFProtection.addToHeaders({});
      Object.assign(config.headers, csrfHeaders);
    } catch (error) {
      console.warn("CSRF token eklenemedi:", error);
    }

    // POST/PUT/PATCH isteklerinde data sanitization
    if (
      config.data &&
      ["post", "put", "patch"].includes(config.method?.toLowerCase() || "")
    ) {
      config.data = sanitizeRequestData(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Data sanitization fonksiyonu - any tiplerini düzeltiyoruz
function sanitizeRequestData(data: unknown): unknown {
  if (typeof data === "string") {
    return InputSanitizer.sanitizeInput(data);
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeRequestData);
  }

  if (data && typeof data === "object" && data !== null) {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === "email") {
        sanitized[key] = InputSanitizer.sanitizeEmail(value as string);
      } else if (key === "phone") {
        sanitized[key] = InputSanitizer.sanitizePhone(value as string);
      } else {
        sanitized[key] = sanitizeRequestData(value);
      }
    }
    return sanitized;
  }

  return data;
}

// Response interceptor ekleyin
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Token süresi dolmuşsa ve henüz retry yapılmamışsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token ile yeni access token al
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
          {},
          {
            withCredentials: true, // Cookie'deki refresh token için
          }
        );

        const { accessToken, user } = refreshResponse.data;

        // Yeni token'ı store'a kaydet
        const authStorage = localStorage.getItem("auth-storage");
        if (authStorage) {
          const storage = JSON.parse(authStorage);
          storage.state.accessToken = accessToken;
          storage.state.user = user;
          storage.state.isAuthenticated = true;
          localStorage.setItem("auth-storage", JSON.stringify(storage));
        }

        // Orijinal isteği yeni token ile tekrar gönder
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token da geçersizse kullanıcıyı logout yap
        const authStorage = localStorage.getItem("auth-storage");
        if (authStorage) {
          const storage = JSON.parse(authStorage);
          storage.state.user = null;
          storage.state.accessToken = null;
          storage.state.isAuthenticated = false;
          localStorage.setItem("auth-storage", JSON.stringify(storage));
        }

        // Login sayfasına yönlendir
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
