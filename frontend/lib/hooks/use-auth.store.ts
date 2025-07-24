import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserResponse } from "../validators/user.schema";

// User tipini user.schema'dan import ediyoruz
interface AuthState {
  user: UserResponse | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: UserResponse | null) => void;
  setToken: (token: string | null) => void;
  refreshAuth: (user: UserResponse, accessToken: string) => void;
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
      setUser: (user) => set({ user: user, isAuthenticated: !!user }),
      setToken: (token) => set({ accessToken: token }),
      
      // Refresh fonksiyonu
      refreshAuth: (user, accessToken) => set({ 
        user, 
        accessToken, 
        isAuthenticated: true 
      }),

      logout: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
