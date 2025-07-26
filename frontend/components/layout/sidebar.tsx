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
    <div className="flex h-full w-64 flex-col bg-white/98 dark:bg-black/98 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50">
      {/* Premium Logo/Brand */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <Link href={`/`}>
            <span className="font-bold text-lg bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
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
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50/80 dark:hover:bg-gray-800/50"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-green-600"
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
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
                        ? "bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 shadow-lg shadow-gray-800/25 dark:shadow-gray-200/25"
                        : "text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50/80 dark:hover:bg-gray-800/50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        isActive
                          ? "text-white dark:text-gray-900"
                          : "text-gray-500 dark:text-gray-400 group-hover:text-green-600"
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
      <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-4 bg-gradient-to-t from-gray-50/30 to-transparent dark:from-gray-800/20">
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors">
          <Avatar className="h-10 w-10 ring-2 ring-green-500/50 ring-offset-2 ring-offset-white dark:ring-offset-black">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white font-semibold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
              {user?.name}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <Badge
                variant="outline"
                className={cn(
                  "text-xs border-0 shadow-sm",
                  user?.role === "Admin"
                    ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white dark:from-gray-100 dark:to-gray-200 dark:text-gray-900"
                    : user?.role === "Moderator"
                    ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white"
                )}
              >
                {user?.role === "Admin" && (
                  <ShieldCheck className="w-3 h-3 mr-1" />
                )}
                {user?.role === "Moderator" && (
                  <Shield className="w-3 h-3 mr-1" />
                )}
                {user?.role === "User" && <User className="w-3 h-3 mr-1" />}
                {user?.role}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
