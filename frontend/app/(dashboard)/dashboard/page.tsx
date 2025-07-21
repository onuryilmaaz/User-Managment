"use client";

import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity, Users, UserCheck, Settings } from "lucide-react";

export default function DashboardPage() {
  // Zustand store'dan anlık kullanıcı bilgisini alıyoruz
  const { user } = useAuthStore();

  // Kullanıcı bilgisi henüz yüklenmediyse bir bekleme ekranı gösterebiliriz
  if (!user) {
    return <div>Yükleniyor...</div>;
  }

  // Admin veya Moderatör olup olmadığını kontrol edelim
  const isAdminOrModerator = user.role === "Admin" || user.role === "Moderator";

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Karşılama Mesajı */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Merhaba, {user.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Panelinize hoş geldiniz. İşte genel bir bakış.
        </p>
      </div>

      {/* 2. Normal Kullanıcı İçin İstatistik Kartları */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profil Tamamlanma
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">
              Profilini tamamlayarak daha iyi bir deneyim yaşa.
            </p>
          </CardContent>
        </Card>
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

      {/* 3. Sadece Admin ve Moderatörlerin Göreceği Alan */}
      {isAdminOrModerator && (
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Yönetim Paneli</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Toplam Kullanıcı
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+1250</div>
                <p className="text-xs text-muted-foreground">
                  Sistemdeki toplam kullanıcı sayısı
                </p>
              </CardContent>
            </Card>
            {/* Buraya admin/moderatör için başka kartlar eklenebilir */}
          </div>
        </div>
      )}

      {/* 4. Hızlı Erişim Butonları */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Hızlı Erişim</h2>
        <div className="flex items-center gap-4 mt-4">
          <Button asChild>
            <Link href="/profile">Profilini Düzenle</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/settings">Ayarlar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
