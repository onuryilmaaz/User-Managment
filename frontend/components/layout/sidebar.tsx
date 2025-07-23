"use client";

import { useAuthStore } from "@/lib/hooks/use-auth.store";
import Link from "next/link";
import { Home, User, Settings, ShieldCheck, Users } from "lucide-react";

export function Sidebar() {
  const { user } = useAuthStore();
  const isAdminOrModerator =
    user?.role === "Admin" || user?.role === "Moderator";

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Link
            href="/"
            className="mb-2 px-4 text-lg font-semibold tracking-tight"
          >
            Menü
          </Link>
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Home className="mr-2 h-4 w-4" />
              Ana Sayfa
            </Link>
            <Link
              href="/profile"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <User className="mr-2 h-4 w-4" />
              Profil
            </Link>
            <Link
              href="/settings"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="mr-2 h-4 w-4" />
              Ayarlar
            </Link>
          </div>
        </div>

        {/* Admin/Moderatör Menüsü */}
        {isAdminOrModerator && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Yönetim
            </h2>
            <div className="space-y-1">
              <Link
                href="/admin/users"
                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <Users className="mr-2 h-4 w-4" />
                Kullanıcı Yönetimi
              </Link>
              {user?.role === "Admin" && (
                <Link
                  href="/admin/settings"
                  className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Sistem Ayarları
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
