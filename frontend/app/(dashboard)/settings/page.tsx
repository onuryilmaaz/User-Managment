"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Shield, Bell, Key, ChevronRight } from "lucide-react";

const settingsItems = [
  {
    title: "Profil",
    description: "Kişisel bilgilerinizi yönetin",
    href: "/settings/profile",
    icon: User,
  },
  {
    title: "Güvenlik",
    description: "Şifre ve güvenlik ayarları",
    href: "/settings/security",
    icon: Shield,
  },
  {
    title: "Bildirimler",
    description: "E-posta ve push bildirimleri",
    href: "/settings/notifications",
    icon: Bell,
  },
  {
    title: "API Anahtarları",
    description: "API erişim anahtarlarınızı yönetin",
    href: "/settings/api-keys",
    icon: Key,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ayarlar</h1>
        <p className="text-muted-foreground">
          Hesap ayarlarınızı ve tercihlerinizi yönetin.
        </p>
      </div>

      <div className="grid gap-4">
        {settingsItems.map((item) => (
          <Card key={item.href} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
