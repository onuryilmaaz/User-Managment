import api from "../api";
import {
  UpdateUserProfilePayload,
  ChangeUserPasswordPayload,
  GetUserListPayload,
  UserResponse,
  UserListResponse,
} from "../validators/user.schema";

// 1. KULLANICI PROFİL BİLGİLERİNİ AL (getMe)
export const getUserProfile = async (): Promise<UserResponse> => {
  try {
    const { data } = await api.get("/api/user/me");
    return data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    throw new Error(
      err.response?.data?.message || "Profil bilgileri alınırken hata oluştu."
    );
  }
};

// 2. KULLANICI PROFİL GÜNCELLEME (updateProfile)
export const updateUserProfile = async (
  payload: UpdateUserProfilePayload
): Promise<UserResponse> => {
  try {
    const { data } = await api.put("/api/user/update-profile", payload);
    return data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    throw new Error(
      err.response?.data?.message || "Profil güncellenirken bir hata oluştu."
    );
  }
};

// 3. ŞİFRE DEĞİŞTİRME (changePassword)
export const changeUserPassword = async (
  payload: ChangeUserPasswordPayload
): Promise<{ message: string }> => {
  try {
    const { data } = await api.patch("/api/user/change-password", payload);
    return data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    throw new Error(
      err.response?.data?.message || "Şifre değiştirilirken hata oluştu."
    );
  }
};

// 4. KULLANICI LİSTESİ ALMA (getUserList) - Admin/Moderator
export const getUserList = async (
  params?: GetUserListPayload
): Promise<UserListResponse> => {
  try {
    const { data } = await api.get("/api/user/list", { params });
    return data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    throw new Error(
      err.response?.data?.message || "Kullanıcı listesi alınırken hata oluştu."
    );
  }
};

// 5. KULLANICI SİLME (deleteUser) - Admin
export const deleteUser = async (
  userId: string
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete(`/api/user/delete/${userId}`);
    return data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    throw new Error(
      err.response?.data?.message || "Kullanıcı silinirken hata oluştu."
    );
  }
};

// 6. KULLANICI DURUMU DEĞİŞTİRME (toggleUserStatus) - Admin/Moderator
export const toggleUserStatus = async (
  userId: string
): Promise<{ message: string; user: UserResponse }> => {
  try {
    const { data } = await api.patch(`/api/user/toggle-status/${userId}`);
    return data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    throw new Error(
      err.response?.data?.message ||
        "Kullanıcı durumu değiştirilirken hata oluştu."
    );
  }
};

// 7. KULLANICI ROL DEİŞTİRME (changeUserRole) - Admin
export const changeUserRole = async (
  userId: string,
  role: "User" | "Moderator"
): Promise<{ message: string; user: UserResponse }> => {
  try {
    const { data } = await api.patch(`/api/user/change-role/${userId}`, {
      role,
    });
    return data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    throw new Error(
      err.response?.data?.message ||
        "Kullanıcı rolü değiştirilirken hata oluştu."
    );
  }
};

// 8. PROFİL RESMİ YÜKLEME (uploadImage)
export const uploadUserImage = async (
  file: File
): Promise<{ message: string; imageUrl: string }> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const { data } = await api.post("/api/user/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    throw new Error(err.response?.data?.message || "Resim yüklenemedi.");
  }
};
