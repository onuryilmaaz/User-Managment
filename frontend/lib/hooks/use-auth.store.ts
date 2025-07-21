import { create } from "zustand";
import { persist } from "zustand/middleware";

// Mongoose şeman ile tam uyumlu, güncellenmiş User tipi
interface User {
  id: string;
  name: string;
  surname?: string;
  username?: string;
  email: string;
  role: "User" | "Moderator" | "Admin";
  isVerified: boolean;
  isActive: boolean;
  profilePicture?: string;
  bio?: string;
  phone?: string;
  location?: {
    country?: string;
    city?: string;
  };
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // --- Başlangıç Değerleri ---
      user: null,
      accessToken: null,
      isAuthenticated: false,

      // --- Eylemler (Actions) ---
      // Kullanıcı bilgisini ve doğrulama durumunu ayarlar
      setUser: (user) => set({ user: user, isAuthenticated: !!user }),

      // Sadece accessToken'ı ayarlar
      setToken: (token) => set({ accessToken: token }),

      // Tüm oturum bilgilerini temizler
      logout: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // localStorage'daki anahtarın adı
    }
  )
);
