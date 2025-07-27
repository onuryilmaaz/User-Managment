"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import {
  Home,
  Users,
  Settings,
  User,
  Shield,
  ShieldCheck,
  BarChart3,
  Zap,
  Crown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const navigation = [
  {
    name: "Ana Sayfa",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Profil",
    href: "/profile",
    icon: User,
  },
  {
    name: "Ayarlar",
    href: "/settings",
    icon: Settings,
  },
];

const adminNavigation = [
  {
    name: "Kullanıcı Yönetimi",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Analitik",
    href: "/admin/analytics",
    icon: BarChart3,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const isAdmin = user?.role === "Admin";
  const isModerator = user?.role === "Moderator";
  const canAccessAdmin = isAdmin || isModerator;

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-white/95 to-slate-50/95 dark:from-slate-950/95 dark:to-slate-900/95 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 shadow-xl">
      {/* Premium Logo/Brand */}
      <div className="flex h-16 items-center px-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-200"></div>
          </div>
          <Link href="/">
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              AuthFlow
            </span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25"
                    : "text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-slate-500 dark:text-slate-400 group-hover:text-emerald-600"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Admin Section */}
        {canAccessAdmin && (
          <div className="pt-6">
            <div className="px-4 pb-2">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Yönetim Paneli
              </h3>
            </div>
            <div className="space-y-1">
              {adminNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-violet-700 text-white shadow-lg shadow-purple-500/25"
                        : "text-slate-700 dark:text-slate-300 hover:text-purple-600 hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        isActive
                          ? "text-white"
                          : "text-slate-500 dark:text-slate-400 group-hover:text-purple-600"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Premium User Info Footer */}
      <div className="border-t border-slate-200/50 dark:border-slate-700/50 p-4 bg-gradient-to-t from-slate-50/30 to-transparent dark:from-slate-800/20">
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
          <div className="relative">
            <Avatar className="h-10 w-10 ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 shadow-lg group-hover:scale-105 transition-transform duration-200">
              <AvatarImage
                src={user?.profilePicture || "/placeholder.svg"}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white font-semibold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-200"></div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              {user?.name}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <Badge
                className={cn(
                  "text-xs border-0 shadow-sm font-medium",
                  user?.role === "Admin"
                    ? "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                    : user?.role === "Moderator"
                    ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white"
                    : "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                )}
              >
                {user?.role === "Admin" && <Crown className="w-3 h-3 mr-1" />}
                {user?.role === "Moderator" && (
                  <Shield className="w-3 h-3 mr-1" />
                )}
                {user?.role === "User" && <User className="w-3 h-3 mr-1" />}
                {user?.role}
              </Badge>
              {user?.isVerified && (
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
