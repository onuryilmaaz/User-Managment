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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    security: true,
    updates: false,
    marketing: false,
  });

  const [pushNotifications, setPushNotifications] = useState({
    security: true,
    updates: false,
    marketing: false,
  });

  const handleSave = () => {
    // API çağrısı yapılacak
    toast.success("Bildirim ayarları güncellendi");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bildirim Ayarları</h1>
        <p className="text-muted-foreground">
          Hangi bildirimleri almak istediğinizi seçin.
        </p>
      </div>

      <div className="space-y-6">
        {/* E-posta Bildirimleri */}
        <Card>
          <CardHeader>
            <CardTitle>E-posta Bildirimleri</CardTitle>
            <CardDescription>
              E-posta yoluyla hangi bildirimleri almak istediğinizi seçin.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-security">Güvenlik Uyarıları</Label>
                <p className="text-sm text-muted-foreground">
                  Şüpheli giriş denemeleri ve güvenlik olayları
                </p>
              </div>
              <Switch
                id="email-security"
                checked={emailNotifications.security}
                onCheckedChange={(checked) =>
                  setEmailNotifications((prev) => ({ ...prev, security: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-updates">Sistem Güncellemeleri</Label>
                <p className="text-sm text-muted-foreground">
                  Yeni özellikler ve sistem güncellemeleri
                </p>
              </div>
              <Switch
                id="email-updates"
                checked={emailNotifications.updates}
                onCheckedChange={(checked) =>
                  setEmailNotifications((prev) => ({ ...prev, updates: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-marketing">Pazarlama E-postaları</Label>
                <p className="text-sm text-muted-foreground">
                  Promosyonlar ve özel teklifler
                </p>
              </div>
              <Switch
                id="email-marketing"
                checked={emailNotifications.marketing}
                onCheckedChange={(checked) =>
                  setEmailNotifications((prev) => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Push Bildirimleri */}
        <Card>
          <CardHeader>
            <CardTitle>Push Bildirimleri</CardTitle>
            <CardDescription>
              Tarayıcı bildirimleri için tercihlerinizi ayarlayın.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-security">Güvenlik Uyarıları</Label>
                <p className="text-sm text-muted-foreground">
                  Anında güvenlik bildirimleri
                </p>
              </div>
              <Switch
                id="push-security"
                checked={pushNotifications.security}
                onCheckedChange={(checked) =>
                  setPushNotifications((prev) => ({ ...prev, security: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-updates">Sistem Güncellemeleri</Label>
                <p className="text-sm text-muted-foreground">
                  Önemli sistem güncellemeleri
                </p>
              </div>
              <Switch
                id="push-updates"
                checked={pushNotifications.updates}
                onCheckedChange={(checked) =>
                  setPushNotifications((prev) => ({ ...prev, updates: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-marketing">Pazarlama Bildirimleri</Label>
                <p className="text-sm text-muted-foreground">
                  Özel teklifler ve duyurular
                </p>
              </div>
              <Switch
                id="push-marketing"
                checked={pushNotifications.marketing}
                onCheckedChange={(checked) =>
                  setPushNotifications((prev) => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Ayarları Kaydet</Button>
        </div>
      </div>
    </div>
  );
}
