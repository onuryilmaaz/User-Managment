import api from "../api";
import {
  UserRegisterPayload,
  UserLoginPayload,
  UpdateProfilePayload,
} from "../validators/auth.schema";

// Swagger'daki /api/auth/register endpoint'ine karşılık gelir
export const registerUser = async (payload: UserRegisterPayload) => {
  try {
    const { data } = await api.post("/api/auth/register", payload);
    return data;
  } catch (error: any) {
    // Hata mesajını yakalayıp fırlatmak, formda göstermeyi kolaylaştırır
    throw new Error(
      error.response?.data?.message || "Kayıt sırasında bir hata oluştu."
    );
  }
};

// --- YENİ EKLENEN LOGIN FONKSİYONU ---
// Swagger'daki /api/auth/login endpoint'ine karşılık gelir
export const loginUser = async (payload: UserLoginPayload) => {
  try {
    const { data } = await api.post("/api/auth/login", payload);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "E-posta veya şifre hatalı."
    );
  }
};

export const updateUserProfile = async (payload: UpdateProfilePayload) => {
  try {
    const { data } = await api.put("/api/user/update-profile", payload);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Profil güncellenirken bir hata oluştu."
    );
  }
};
