import api from "../api";
import { UpdateProfilePayload } from "../validators/auth.schema";

export const updateUserProfile = async (payload: UpdateProfilePayload) => {
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

export const uploadImage = async (file: File) => {
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

// Admin/Moderatör için kullanıcı yönetimi API'leri
export const getUserList = async () => {
  try {
    const { data } = await api.get("/api/user/list");
    return data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    throw new Error(
      err.response?.data?.message || "Kullanıcı listesi alınırken hata oluştu."
    );
  }
};

export const deleteUser = async (userId: string) => {
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

export const toggleUserStatus = async (userId: string) => {
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

export const changeUserRole = async (
  userId: string,
  role: "User" | "Moderator"
) => {
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

export const promoteToModerator = async (userId: string) => {
  try {
    const { data } = await api.patch(
      `/api/user/promote-to-moderator/${userId}`
    );
    return data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    throw new Error(
      err.response?.data?.message || "Moderatör yapılırken hata oluştu."
    );
  }
};

export const demoteFromModerator = async (userId: string) => {
  try {
    const { data } = await api.patch(
      `/api/user/demote-from-moderator/${userId}`
    );
    return data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    throw new Error(
      err.response?.data?.message || "Moderatörlükten çıkarılırken hata oluştu."
    );
  }
};

// Kullanıcı profil bilgilerini al
export const getUserProfile = async () => {
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
