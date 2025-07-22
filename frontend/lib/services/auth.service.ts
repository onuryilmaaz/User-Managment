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
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Kayıt sırasında bir hata oluştu.";
    throw new Error(errorMessage);
  }
};

// Login
export const loginUser = async (payload: UserLoginPayload) => {
  try {
    const { data } = await api.post("/api/auth/login", payload);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "E-posta veya şifre hatalı.";
    throw new Error(errorMessage);
  }
};

// Email verification
export const verifyCode = async (payload: { email: string; code: string }) => {
  try {
    const { data } = await api.post("/api/auth/verify-code", payload);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Doğrulama kodu hatalı.";
    throw new Error(errorMessage);
  }
};

// Resend verification code
export const resendVerificationCode = async (payload: { email: string }) => {
  try {
    const { data } = await api.post(
      "/api/auth/resend-verification-code",
      payload
    );
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Kod gönderilirken bir hata oluştu.";
    throw new Error(errorMessage);
  }
};

// Forgot password
export const forgotPassword = async (payload: { email: string }) => {
  try {
    const { data } = await api.post("/api/auth/forgot-password", payload);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "E-posta gönderilirken bir hata oluştu.";
    throw new Error(errorMessage);
  }
};

// Reset password
export const resetPassword = async (payload: {
  token: string;
  password: string;
}) => {
  try {
    const { data } = await api.post(
      `/api/auth/reset-password/${payload.token}`,
      { password: payload.password }
    );
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Şifre sıfırlanırken bir hata oluştu.";
    throw new Error(errorMessage);
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const { data } = await api.post("/api/auth/logout");
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Çıkış yapılırken bir hata oluştu.";
    throw new Error(errorMessage);
  }
};

// Profile update
export const updateUserProfile = async (payload: UpdateProfilePayload) => {
  try {
    const { data } = await api.put("/api/user/update-profile", payload);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Profil güncellenirken bir hata oluştu.";
    throw new Error(errorMessage);
  }
};

// Change password (for logged in users)
export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const { data } = await api.put("/api/user/change-password", payload);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Şifre değiştirilirken bir hata oluştu.";
    throw new Error(errorMessage);
  }
};
