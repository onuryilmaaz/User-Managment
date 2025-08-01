import { z } from "zod";

// Ortak şifre validasyonu
const passwordValidation = z
  .string()
  .min(8, "Şifre en az 8 karakter olmalıdır.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]/,
    "Şifre en az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir."
  );

// 1. KAYIT OL API için
export const UserRegisterSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  surname: z.string().min(2, "Soyisim en az 2 karakter olmalıdır."),
  username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  password: passwordValidation,
});

export type UserRegisterPayload = z.infer<typeof UserRegisterSchema>;

// 2. GİRİŞ YAP API için
export const UserLoginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  password: z.string().min(1, "Şifre alanı boş bırakılamaz."),
});

export type UserLoginPayload = z.infer<typeof UserLoginSchema>;

// 3. DOĞRULAMA KODU DOĞRULA API için
export const VerifyCodeSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  code: z
    .string()
    .length(6, "Doğrulama kodu 6 haneli olmalıdır.")
    .regex(/^\d+$/, "Sadece rakam giriniz."),
});

export type VerifyCodePayload = z.infer<typeof VerifyCodeSchema>;

// 4. DOĞRULAMA KODU YENİDEN GÖNDER API için
export const ResendVerificationCodeSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
});

export type ResendVerificationCodePayload = z.infer<
  typeof ResendVerificationCodeSchema
>;

// 5. ŞİFREMİ UNUTTUM - KOD GÖNDER API için
export const ForgotPasswordSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
});

export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>;

// 6. YENİ ŞİFRE BELİRLE API için (kod doğrulaması + şifre değiştirme)
export const ResetPasswordWithCodeSchema = z
  .object({
    email: z.string().email("Geçerli bir e-posta adresi giriniz."),
    code: z
      .string()
      .length(6, "Doğrulama kodu 6 haneli olmalıdır.")
      .regex(/^\d+$/, "Sadece rakam giriniz."),
    newPassword: passwordValidation,
    confirmPassword: z.string().min(1, "Şifre onayı gereklidir."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

export type ResetPasswordWithCodePayload = z.infer<
  typeof ResetPasswordWithCodeSchema
>;

// 7. KULLANICI PROFİL GÜNCELLEME (Frontend için)
export const UpdateProfileSchema = z.object({
  profilePicture: z
    .string()
    .url("Geçerli bir URL giriniz.")
    .optional()
    .or(z.literal("")),
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  surname: z.string().optional(),
  username: z
    .string()
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır.")
    .optional(),
  bio: z
    .string()
    .max(200, "Biyografi en fazla 200 karakter olabilir.")
    .optional(),
  phone: z.string().max(20, "Telefon numarası geçersiz.").optional(),
  location: z
    .object({
      country: z.string().optional(),
      city: z.string().optional(),
    })
    .optional(),
  social: z
    .object({
      github: z
        .string()
        .url("Geçerli bir URL giriniz.")
        .optional()
        .or(z.literal("")),
      twitter: z
        .string()
        .url("Geçerli bir URL giriniz.")
        .optional()
        .or(z.literal("")),
      linkedin: z
        .string()
        .url("Geçerli bir URL giriniz.")
        .optional()
        .or(z.literal("")),
      website: z
        .string()
        .url("Geçerli bir URL giriniz.")
        .optional()
        .or(z.literal("")),
    })
    .optional(),
});

export type UpdateProfilePayload = z.infer<typeof UpdateProfileSchema>;

// 2FA Validasyon Şemaları
export const TwoFactorSetupSchema = z.object({
  code: z
    .string()
    .length(6, "Doğrulama kodu 6 haneli olmalıdır.")
    .regex(/^\d+$/, "Sadece rakam giriniz."),
});

export type TwoFactorSetupPayload = z.infer<typeof TwoFactorSetupSchema>;

export const TwoFactorVerifySchema = z.object({
  code: z
    .string()
    .length(6, "Doğrulama kodu 6 haneli olmalıdır.")
    .regex(/^\d+$/, "Sadece rakam giriniz."),
});

export type TwoFactorVerifyPayload = z.infer<typeof TwoFactorVerifySchema>;

// Şifre Değiştirme Şeması
export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mevcut şifre gereklidir."),
    newPassword: passwordValidation,
    confirmPassword: z.string().min(1, "Şifre onayı gereklidir."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

export type ChangePasswordPayload = z.infer<typeof ChangePasswordSchema>;

// Şifre Sıfırlama Şeması
export const ResetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string().min(1, "Şifre onayı gereklidir."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;

// E-posta Doğrulama Şeması
export const VerifyEmailSchema = z.object({
  code: z
    .string()
    .length(6, "Doğrulama kodu 6 haneli olmalıdır.")
    .regex(/^\d+$/, "Sadece rakam giriniz."),
});

export type VerifyEmailPayload = z.infer<typeof VerifyEmailSchema>;

// Admin Kullanıcı Yönetimi Şemaları
export const UpdateUserRoleSchema = z.object({
  userId: z.string().min(1, "Kullanıcı ID gereklidir."),
  role: z.enum(["user", "moderator", "admin"], {
    message: "Geçerli bir rol seçiniz.",
  }),
});

export type UpdateUserRolePayload = z.infer<typeof UpdateUserRoleSchema>;

// Bildirim Ayarları Şeması
export const NotificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
  securityAlerts: z.boolean().default(true),
  weeklyDigest: z.boolean().default(true),
});

export type NotificationSettingsPayload = z.infer<
  typeof NotificationSettingsSchema
>;

// Güvenlik Ayarları Şeması
export const SecuritySettingsSchema = z.object({
  twoFactorEnabled: z.boolean(),
  loginNotifications: z.boolean(),
  sessionTimeout: z.number().min(5).max(1440), // 5 dakika - 24 saat
});

export type SecuritySettingsPayload = z.infer<typeof SecuritySettingsSchema>;
