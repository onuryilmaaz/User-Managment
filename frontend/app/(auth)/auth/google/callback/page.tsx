"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { toast } from "sonner";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setToken } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URL'den parametreleri al
        const user = searchParams.get('user');
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (error) {
          toast.error(decodeURIComponent(error));
          router.push('/login');
          return;
        }

        if (user && token) {
          // Kullanıcı bilgilerini parse et
          const userData = JSON.parse(decodeURIComponent(user));
          
          // Store'a kaydet
          setUser(userData);
          setToken(token);
          
          toast.success('Google ile giriş başarılı!');
          router.push('/dashboard');
        } else {
          toast.error('Google ile giriş başarısız');
          router.push('/login');
        }
      } catch (error) {
        console.error('Google callback error:', error);
        toast.error('Giriş işlemi sırasında hata oluştu');
        router.push('/login');
      }
    };

    handleCallback();
  }, [searchParams, router, setUser, setToken]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Google ile giriş işlemi tamamlanıyor...</p>
      </div>
    </div>
  );
}