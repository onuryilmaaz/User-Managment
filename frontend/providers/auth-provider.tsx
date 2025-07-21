"use client";

import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // Zustand state'i local storage'dan yüklendikten sonra çalışır.
    // Eğer kullanıcı giriş yapmamışsa, login sayfasına yönlendir.
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [isAuthenticated, router]);

  // Kimlik doğrulaması kontrol edilirken içeriği gösterme
  // Bu, login sayfasının anlık olarak görünüp kaybolmasını engeller.
  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Yükleniyor...
      </div>
    );
  }

  return <>{children}</>;
}
