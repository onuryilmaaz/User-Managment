import api from "../api";
import { UpdateProfilePayload } from "../validators/auth.schema";

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

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file); // Backend'deki upload.single("image") ile aynı olmalı

  try {
    const { data } = await api.post("/api/user/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data; // { imageUrl: "http://..." } dönecek
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Resim yüklenemedi.");
  }
};
