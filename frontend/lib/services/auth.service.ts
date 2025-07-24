import api from "../api";
import {
  UserRegisterPayload,
  UserLoginPayload,
  VerifyCodePayload,
  ResendVerificationCodePayload,
  ForgotPasswordPayload,
  ResetPasswordWithCodePayload,
} from "../validators/auth.schema";

// 1. KAYIT OL
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

// 2. GİRİŞ YAP
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

// 3. DOĞRULAMA KODU DOĞRULA
export const verifyCode = async (payload: VerifyCodePayload) => {
  try {
    const { data } = await api.post("/api/auth/verify-code", payload);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Doğrulama kodu hatalı.";
    throw new Error(errorMessage);
  }
};

// 4. DOĞRULAMA KODU YENİDEN GÖNDER
export const resendVerificationCode = async (
  payload: ResendVerificationCodePayload
) => {
  try {
    const { data } = await api.post("/api/auth/resend-code", payload);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Kod gönderilirken bir hata oluştu.";
    throw new Error(errorMessage);
  }
};

// 5. ŞİFREMİ UNUTTUM - KOD GÖNDER
export const forgotPassword = async (payload: ForgotPasswordPayload) => {
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

// 6. YENİ ŞİFRE BELİRLE (kod doğrulaması + şifre değiştirme)
export const resetPasswordWithCode = async (
  payload: ResetPasswordWithCodePayload
) => {
  try {
    const { data } = await api.post("/api/auth/reset-password", payload);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Şifre sıfırlanırken bir hata oluştu.";
    throw new Error(errorMessage);
  }
};

// 7. ÇIKIŞ YAP
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

// 8. TOKEN YENİLE
export const refreshToken = async () => {
  try {
    const { data } = await api.post("/api/auth/refresh");
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Token yenilenirken bir hata oluştu.";
    throw new Error(errorMessage);
  }
};

// 9. GOOGLE AUTH CALLBACK (Frontend'te genellikle otomatik çağrılır)
export const handleGoogleAuthCallback = (userParam: string, token: string) => {
  try {
    const user = JSON.parse(decodeURIComponent(userParam));
    // Token'ı localStorage veya cookie'ye kaydet
    localStorage.setItem("accessToken", token);
    return { user, token };
  } catch (error) {
    console.error(error);
    throw new Error("Google auth callback işlenirken hata oluştu");
  }
};
