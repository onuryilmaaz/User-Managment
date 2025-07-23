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
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Ayarlar",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const adminNavigation = [
  {
    name: "Kullanıcı Yönetimi",
    href: "/admin/users",
    icon: Users,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const isAdmin = user?.role === "Admin";
  const isModerator = user?.role === "Moderator";
  const canAccessAdmin = isAdmin || isModerator;

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center px-6 border-b">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}

        {/* Admin Section */}
        {canAccessAdmin && (
          <>
            <div className="pt-4 pb-2">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Yönetim
              </h3>
            </div>
            {adminNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* User Info Footer */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>
              {user?.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <div className="flex items-center space-x-1">
              <Badge variant="outline" className="text-xs">
                {user?.role === "Admin" && (
                  <ShieldCheck className="w-3 h-3 mr-1" />
                )}
                {user?.role === "Moderator" && (
                  <Shield className="w-3 h-3 mr-1" />
                )}
                {user?.role}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
