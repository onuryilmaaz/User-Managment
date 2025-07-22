"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Shield, Activity, Bell, Key, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const settingsItems = [
    {
      title: "Profil Ayarları",
      description: "Kişisel bilgilerinizi ve profil fotoğrafınızı düzenleyin",
      href: "/profile",
      icon: User,
    },
    {
      title: "Şifre Değiştir",
      description: "Hesabınızın güvenliği için şifrenizi güncelleyin",
      href: "/settings/change-password",
      icon: Key,
    },
    {
      title: "Aktivite Geçmişi",
      description: "Hesabınızdaki son aktiviteleri görüntüleyin",
      href: "/settings/activity",
      icon: Activity,
    },
    {
      title: "Güvenlik Ayarları",
      description: "İki faktörlü kimlik doğrulama ve güvenlik seçenekleri",
      href: "/settings/security",
      icon: Shield,
    },
    {
      title: "Bildirim Ayarları",
      description: "E-posta ve push bildirim tercihlerinizi yönetin",
      href: "/settings/notifications",
      icon: Bell,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
        <p className="text-muted-foreground">
          Hesabınızı ve tercihlerinizi yönetin.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.href} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-4">
                  {item.description}
                </CardDescription>
                <Link href={item.href}>
                  <Button variant="outline" className="w-full">
                    Düzenle
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
