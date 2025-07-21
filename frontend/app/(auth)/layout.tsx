import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Sayfanın tamamını kaplayan ve dikey bir düzen oluşturan ana kapsayıcı
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Header artık burada ve her zaman tam genişlikte olacak */}
      <LandingHeader />

      {/* Sadece formların olduğu ana içerik bölümü. 
          Bu bölüm kendini ortalayacak şekilde ayarlandı. */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      {/* Footer artık burada ve her zaman tam genişlikte olacak */}
      <LandingFooter />
    </div>
  );
}
