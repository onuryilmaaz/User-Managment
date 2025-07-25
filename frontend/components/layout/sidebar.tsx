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
    <div className="flex h-full w-64 flex-col bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800">
      {/* Modern Logo/Brand */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-md">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AuthFlow
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400"
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
            <div className="px-3 pb-2">
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
                      "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/20"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        isActive
                          ? "text-white"
                          : "text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400"
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

      {/* Modern User Info Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <Avatar className="h-10 w-10 ring-2 ring-green-100 dark:ring-green-900">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {user?.name}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <Badge
                variant="outline"
                className={cn(
                  "text-xs border-0",
                  user?.role === "Admin"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                    : user?.role === "Moderator"
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                    : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
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
