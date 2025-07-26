"use client";

import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Settings,
  Shield,
  ShieldCheck,
  User,
  TrendingUp,
  Clock,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getUserList } from "@/lib/services/user.service";

// User interface tanımı
interface UserData {
  _id: string;
  name: string;
  surname?: string;
  email: string;
  role: "User" | "Moderator" | "Admin";
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [userStats, setUserStats] = useState({
    total: 0,
    active: 0,
    verified: 0,
  });

  const isAdminOrModerator =
    user?.role === "Admin" || user?.role === "Moderator";

  // Admin/Moderatör için kullanıcı istatistiklerini yükle
  useEffect(() => {
    if (isAdminOrModerator) {
      const loadUserStats = async () => {
        try {
          const response = await getUserList();
          const users: UserData[] = response.users;
          setUserStats({
            total: users.length,
            active: users.filter((u: UserData) => u.isActive).length,
            verified: users.filter((u: UserData) => u.isVerified).length,
          });
        } catch (error) {
          console.error("İstatistikler yüklenirken hata:", error);
        }
      };
      loadUserStats();
    }
  }, [isAdminOrModerator]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hoş geldin, {user.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {new Date().toLocaleDateString("tr-TR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Hesap Durumu */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Hesap Durumu
            </CardTitle>
            <div
              className={`p-2 rounded-xl shadow-sm ${
                user.isVerified
                  ? "bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20"
                  : "bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20"
              }`}
            >
              <UserCheck
                className={`h-4 w-4 ${
                  user.isVerified
                    ? "text-green-600 dark:text-green-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }`}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.isVerified ? "Doğrulanmış" : "Beklemede"}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {user.isVerified
                ? "Hesabınız aktif"
                : "E-posta doğrulaması gerekli"}
            </p>
          </CardContent>
        </Card>

        {/* Rol */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Yetki Seviyesi
            </CardTitle>
            <div className="p-2 rounded-xl shadow-sm bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20">
              {user.role === "Admin" ? (
                <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              ) : user.role === "Moderator" ? (
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              ) : (
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.role}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {user.role === "Admin"
                ? "Tam sistem erişimi"
                : user.role === "Moderator"
                ? "Kullanıcı yönetimi"
                : "Standart erişim"}
            </p>
          </CardContent>
        </Card>

        {/* Admin/Moderatör İstatistikleri */}
        {isAdminOrModerator && (
          <>
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-900/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Toplam Kullanıcı
                </CardTitle>
                <div className="p-2 rounded-xl shadow-sm bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20">
                  <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.total}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Kayıtlı kullanıcı sayısı
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-900 dark:to-emerald-900/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Aktif Kullanıcı
                </CardTitle>
                <div className="p-2 rounded-xl shadow-sm bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.active}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Aktif durumdaki kullanıcılar
                </p>
              </CardContent>
            </Card>
          </>
        )}

        {/* Normal kullanıcılar için son aktivite */}
        {!isAdminOrModerator && (
          <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-900 dark:to-orange-900/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Son Aktivite
              </CardTitle>
              <div className="p-2 rounded-xl shadow-sm bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20">
                <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Bugün</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Dashboarda giriş yaptınız
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-blue-50/20 dark:from-gray-900 dark:to-blue-900/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Hesap İşlemleri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Link href="/profile">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-0 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 hover:from-blue-100 hover:to-blue-200/70 dark:hover:from-blue-900/50 dark:hover:to-blue-800/30 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <User className="mr-3 h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">Profili Düzenle</div>
                    <div className="text-xs text-gray-500">
                      Kişisel bilgilerinizi güncelleyin
                    </div>
                  </div>
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="/settings">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-0 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 hover:from-blue-100 hover:to-blue-200/70 dark:hover:from-blue-900/50 dark:hover:to-blue-800/30 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Settings className="mr-3 h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">Ayarlar</div>
                    <div className="text-xs text-gray-500">
                      Güvenlik ve tercihler
                    </div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Admin/Moderatör Hızlı İşlemler */}
        {isAdminOrModerator && (
          <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-purple-50/20 dark:from-gray-900 dark:to-purple-900/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Yönetim Paneli
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Link href="/admin/users">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 border-0 bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 hover:from-purple-100 hover:to-purple-200/70 dark:hover:from-purple-900/50 dark:hover:to-purple-800/30 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Users className="mr-3 h-4 w-4" />
                    <div className="text-left">
                      <div className="font-medium">Kullanıcı Yönetimi</div>
                      <div className="text-xs text-gray-500">
                        Kullanıcıları görüntüle ve yönet
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {user.role === "Admin" && (
                  <Link href="/admin/settings">
                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 border-0 bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 hover:from-purple-100 hover:to-purple-200/70 dark:hover:from-purple-900/50 dark:hover:to-purple-800/30 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <ShieldCheck className="mr-3 h-4 w-4" />
                      <div className="text-left">
                        <div className="font-medium">Sistem Ayarları</div>
                        <div className="text-xs text-gray-500">
                          Genel sistem konfigürasyonu
                        </div>
                      </div>
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
