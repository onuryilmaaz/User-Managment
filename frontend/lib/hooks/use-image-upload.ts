"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { uploadUserImage } from "@/lib/services/user.service";
import { UploadUserImageSchema } from "@/lib/validators/user.schema";
import { toast } from "sonner";

export function useImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bileşen unmount olduğunda oluşturulan geçici URL'i bellekten temizle
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Dosya validasyonu
      try {
        UploadUserImageSchema.parse({ file });
      } catch (error) {
        console.error(error);
        toast.error(
          "Geçersiz dosya. Lütfen 5MB'dan küçük JPEG, PNG veya WebP formatında bir resim seçin."
        );
        return;
      }

      // Önceki önizlemeyi temizle
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }

      // Yeni yerel önizlemeyi oluştur ve göster
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);
      setUploadedImageUrl(null); // Kalıcı URL'i sıfırla

      // Yüklemeyi başlat
      setIsUploading(true);
      try {
        const response = await uploadUserImage(file);
        // Yükleme başarılı olunca kalıcı URL'i ayarla
        setUploadedImageUrl(response.imageUrl);
        // Başarılı yüklemeden sonra geçici önizlemeyi state'den kaldırabiliriz,
        // çünkü artık kalıcı URL'i kullanacağız.
        setPreviewUrl(null);
        toast.success("Resim başarıyla yüklendi.");
      } catch (err: unknown) {
        const error = err as Error;
        toast.error(error.message || "Resim yüklenemedi.");
        setPreviewUrl(null); // Hata olursa önizlemeyi kaldır
      } finally {
        setIsUploading(false);
      }
    },
    [previewUrl]
  );

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const resetUpload = useCallback(() => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setUploadedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl]);

  return {
    previewUrl,
    uploadedImageUrl,
    isUploading,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    resetUpload,
  };
}
