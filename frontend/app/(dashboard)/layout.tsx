import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { AuthGuard } from "@/providers/auth-provider";
import { ClientOnly } from "@/providers/client-only"; // YENİ IMPORT
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // AuthGuard'ı ClientOnly ile sarmalıyoruz.
    <ClientOnly>
      <AuthGuard>
        <div className="flex h-screen bg-white dark:bg-neutral-900">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </AuthGuard>
    </ClientOnly>
  );
}
