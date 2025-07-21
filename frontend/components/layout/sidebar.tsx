"use client";

import { useAuthStore } from "@/lib/hooks/use-auth.store";
import Link from "next/link";
import { Home, User, Settings, ShieldCheck } from "lucide-react";

export function Sidebar() {
  const { user } = useAuthStore();
  const isAdminOrModerator =
    user?.role === "Admin" || user?.role === "Moderator";

  const navItems = [
    { href: "/dashboard", label: "Ana Sayfa", icon: Home },
    { href: "/profile", label: "Profil", icon: User },
    { href: "/settings", label: "Ayarlar", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 p-4 border-r bg-gray-50 dark:bg-neutral-950">
      <div className="mb-8">
        <Link href="/dashboard" className="text-xl font-bold">
          Proje Adı
        </Link>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-md text-sm font-medium"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}

        {/* Sadece Admin ve Moderatörler için Kullanıcılar linki */}
        {isAdminOrModerator && (
          <Link
            href="/admin/users"
            className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-md text-sm font-medium"
          >
            <ShieldCheck className="h-4 w-4" />
            Kullanıcılar
          </Link>
        )}
      </nav>
    </aside>
  );
}
