import { z } from "zod";

// 1. KULLANICI PROFİL GÜNCELLEME API için
export const UpdateUserProfileSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  surname: z.string().min(2, "Soyisim en az 2 karakter olmalıdır."),
  username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır."),
  bio: z
    .string()
    .max(200, "Biyografi en fazla 200 karakter olabilir.")
    .optional(),
  phone: z.string().max(20, "Telefon numarası geçersiz.").optional(),
  profilePicture: z
    .string()
    .url("Geçerli bir URL giriniz.")
    .optional()
    .or(z.literal("")),
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

export type UpdateUserProfilePayload = z.infer<typeof UpdateUserProfileSchema>;

// 2. ŞİFRE DEĞİŞTİRME API için
export const ChangeUserPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mevcut şifre gereklidir."),
    newPassword: z
      .string()
      .min(8, "Yeni şifre en az 8 karakter olmalıdır.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Şifre en az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir."
      ),
    confirmPassword: z.string().min(1, "Şifre onayı gereklidir."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

export type ChangeUserPasswordPayload = z.infer<typeof ChangeUserPasswordSchema>;

// 3. KULLANICI ROL DEĞİŞTİRME API için (Admin/Moderator)
export const ChangeUserRoleSchema = z.object({
  userId: z.string().min(1, "Kullanıcı ID gereklidir."),
  role: z.enum(["User", "Moderator"], {
    message: "Geçerli bir rol seçiniz (User veya Moderator).",
  }),
});

export type ChangeUserRolePayload = z.infer<typeof ChangeUserRoleSchema>;

// 4. KULLANICI DURUMU DEĞİŞTİRME API için (Admin/Moderator)
export const ToggleUserStatusSchema = z.object({
  userId: z.string().min(1, "Kullanıcı ID gereklidir."),
  isActive: z.boolean(),
});

export type ToggleUserStatusPayload = z.infer<typeof ToggleUserStatusSchema>;

// 5. KULLANICI SİLME API için (Admin)
export const DeleteUserSchema = z.object({
  userId: z.string().min(1, "Kullanıcı ID gereklidir."),
});

export type DeleteUserPayload = z.infer<typeof DeleteUserSchema>;

// 6. KULLANICI LİSTESİ ALMA API için (Query Parameters)
export const GetUserListSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, "Sayfa numarası 1'den büyük olmalıdır."),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0 && val <= 100, "Limit 1-100 arasında olmalıdır."),
  search: z.string().optional(),
  role: z.enum(["User", "Moderator", "Admin"]).optional(),
  isActive: z
    .string()
    .optional()
    .transform((val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return undefined;
    }),
});

export type GetUserListPayload = z.infer<typeof GetUserListSchema>;

// 7. KULLANICI PROFIL RESMİ YÜKLEME API için
export const UploadUserImageSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Dosya boyutu 5MB'dan küçük olmalıdır.")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Sadece JPEG, PNG ve WebP formatları desteklenir."
    ),
});

export type UploadUserImagePayload = z.infer<typeof UploadUserImageSchema>;

// 8. KULLANICI RESPONSE TİPLERİ
export const UserResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  surname: z.string(),
  username: z.string(),
  email: z.string().email(),
  role: z.enum(["User", "Moderator", "Admin"]),
  isActive: z.boolean(),
  isVerified: z.boolean(),
  profilePicture: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  location: z
    .object({
      country: z.string().optional(),
      city: z.string().optional(),
    })
    .optional(),
  social: z
    .object({
      github: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      website: z.string().optional(),
    })
    .optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const UserListResponseSchema = z.object({
  users: z.array(UserResponseSchema),
  totalUsers: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});

export type UserListResponse = z.infer<typeof UserListResponseSchema>;