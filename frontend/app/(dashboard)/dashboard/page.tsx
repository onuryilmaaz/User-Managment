"use client";

import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Activity,
  Users,
  UserCheck,
  Settings,
  Shield,
  ShieldCheck,
  User,
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
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Hoş geldin, {user.name}!
        </h1>
        <p className="text-muted-foreground">
          {user.role === "Admin"
            ? "Sistem yöneticisi olarak tüm özelliklere erişiminiz var."
            : user.role === "Moderator"
            ? "Moderatör olarak kullanıcıları yönetebilirsiniz."
            : "Profilinizi düzenleyebilir ve ayarlarınızı değiştirebilirsiniz."}
        </p>
      </div>

      {/* Kullanıcı Kartları */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hesap Durumu</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.isVerified ? "Doğrulanmış" : "Doğrulanmamış"}
            </div>
            <p className="text-xs text-muted-foreground">
              E-posta: {user.email}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rol</CardTitle>
            {user.role === "Admin" ? (
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            ) : user.role === "Moderator" ? (
              <Shield className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Users className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.role}</div>
            <p className="text-xs text-muted-foreground">
              {user.role === "Admin"
                ? "Tam yetki"
                : user.role === "Moderator"
                ? "Kullanıcı yönetimi"
                : "Standart kullanıcı"}
            </p>
          </CardContent>
        </Card>

        {/* Admin/Moderatör İstatistikleri */}
        {isAdminOrModerator && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Toplam Kullanıcı
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  Sistemde kayıtlı kullanıcı sayısı
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Aktif Kullanıcı
                </CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.active}</div>
                <p className="text-xs text-muted-foreground">
                  Aktif durumdaki kullanıcılar
                </p>
              </CardContent>
            </Card>
          </>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Son Aktivite</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 saat önce</div>
            <p className="text-xs text-muted-foreground">
              Profil bilgilerinizi güncellediniz.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Hızlı İşlemler */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/profile">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profili Düzenle
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Ayarlar
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Admin/Moderatör Hızlı İşlemler */}
        {isAdminOrModerator && (
          <Card>
            <CardHeader>
              <CardTitle>Yönetim İşlemleri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/users">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Kullanıcı Yönetimi
                </Button>
              </Link>
              {user.role === "Admin" && (
                <Link href="/admin/settings">
                  <Button variant="outline" className="w-full justify-start">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Sistem Ayarları
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
