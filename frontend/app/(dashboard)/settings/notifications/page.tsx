"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Mail, Smartphone } from "lucide-react";

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    security: true,
    updates: false,
    marketing: false,
    activity: true,
  });

  const [pushNotifications, setPushNotifications] = useState({
    security: true,
    updates: false,
    activity: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bildirim Ayarları</h1>
        <p className="text-muted-foreground">
          Hangi bildirimleri almak istediğinizi seçin.
        </p>
      </div>

      {/* E-posta Bildirimleri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>E-posta Bildirimleri</span>
          </CardTitle>
          <CardDescription>
            E-posta adresinize gönderilecek bildirim türlerini seçin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Güvenlik Bildirimleri</p>
              <p className="text-sm text-muted-foreground">
                Giriş işlemleri ve güvenlik uyarıları
              </p>
            </div>
            <Switch
              checked={emailNotifications.security}
              onCheckedChange={(checked) =>
                setEmailNotifications((prev) => ({
                  ...prev,
                  security: checked,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Aktivite Bildirimleri</p>
              <p className="text-sm text-muted-foreground">
                Profil değişiklikleri ve hesap aktiviteleri
              </p>
            </div>
            <Switch
              checked={emailNotifications.activity}
              onCheckedChange={(checked) =>
                setEmailNotifications((prev) => ({
                  ...prev,
                  activity: checked,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Ürün Güncellemeleri</p>
              <p className="text-sm text-muted-foreground">
                Yeni özellikler ve sistem güncellemeleri
              </p>
            </div>
            <Switch
              checked={emailNotifications.updates}
              onCheckedChange={(checked) =>
                setEmailNotifications((prev) => ({ ...prev, updates: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Pazarlama E-postaları</p>
              <p className="text-sm text-muted-foreground">
                Promosyonlar ve özel teklifler
              </p>
            </div>
            <Switch
              checked={emailNotifications.marketing}
              onCheckedChange={(checked) =>
                setEmailNotifications((prev) => ({
                  ...prev,
                  marketing: checked,
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Push Bildirimleri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>Push Bildirimleri</span>
          </CardTitle>
          <CardDescription>
            Tarayıcınıza gönderilecek anlık bildirimleri yönetin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Güvenlik Uyarıları</p>
              <p className="text-sm text-muted-foreground">
                Kritik güvenlik olayları için anlık bildirim
              </p>
            </div>
            <Switch
              checked={pushNotifications.security}
              onCheckedChange={(checked) =>
                setPushNotifications((prev) => ({ ...prev, security: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sistem Güncellemeleri</p>
              <p className="text-sm text-muted-foreground">
                Önemli sistem değişiklikleri
              </p>
            </div>
            <Switch
              checked={pushNotifications.updates}
              onCheckedChange={(checked) =>
                setPushNotifications((prev) => ({ ...prev, updates: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Aktivite Bildirimleri</p>
              <p className="text-sm text-muted-foreground">
                Hesap aktiviteleri için bildirim
              </p>
            </div>
            <Switch
              checked={pushNotifications.activity}
              onCheckedChange={(checked) =>
                setPushNotifications((prev) => ({ ...prev, activity: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Kaydet Butonu */}
      <div className="flex justify-end">
        <Button>Ayarları Kaydet</Button>
      </div>
    </div>
  );
}
