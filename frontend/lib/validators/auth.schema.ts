import { z } from "zod";

// --- Mevcut Kayıt Şeması ---
export const UserRegisterSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  surname: z.string().min(2, "Soyisim en az 2 karakter olmalıdır.").optional(),
  username: z
    .string()
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır.")
    .optional(),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
});

export type UserRegisterPayload = z.infer<typeof UserRegisterSchema>;

// --- YENİ EKLENEN GİRİŞ ŞEMASI ---
export const UserLoginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  password: z.string().min(1, "Şifre alanı boş bırakılamaz."), // Giriş formunda şifrenin sadece dolu olması yeterlidir
});

export type UserLoginPayload = z.infer<typeof UserLoginSchema>;

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
