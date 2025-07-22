"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Smartphone,
  Key,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Güvenlik Ayarları</h1>
        <p className="text-muted-foreground">
          Hesabınızın güvenliğini artırmak için bu ayarları kullanın.
        </p>
      </div>

      {/* İki Faktörlü Kimlik Doğrulama */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <CardTitle>İki Faktörlü Kimlik Doğrulama (2FA)</CardTitle>
            {twoFactorEnabled ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Aktif
              </Badge>
            ) : (
              <Badge variant="destructive">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Pasif
              </Badge>
            )}
          </div>
          <CardDescription>
            Hesabınıza ek bir güvenlik katmanı ekleyin. Giriş yaparken
            telefonunuzdan bir kod gerekecek.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>Authenticator App</span>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
          {!twoFactorEnabled && (
            <Button className="w-full">2FA yı Etkinleştir</Button>
          )}
        </CardContent>
      </Card>

      {/* Giriş Bildirimleri */}
      <Card>
        <CardHeader>
          <CardTitle>Giriş Bildirimleri</CardTitle>
          <CardDescription>
            Hesabınıza yapılan giriş işlemleri hakkında bildirim alın.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">E-posta Bildirimleri</p>
              <p className="text-sm text-muted-foreground">
                Yeni giriş yapıldığında e-posta gönder
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Şüpheli Giriş Uyarıları</p>
              <p className="text-sm text-muted-foreground">
                Bilinmeyen cihazlardan giriş yapıldığında uyar
              </p>
            </div>
            <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
          </div>
        </CardContent>
      </Card>

      {/* Aktif Oturumlar */}
      <Card>
        <CardHeader>
          <CardTitle>Aktif Oturumlar</CardTitle>
          <CardDescription>
            Hesabınıza giriş yapmış olan tüm cihazları görüntüleyin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Mevcut Oturum</p>
                <p className="text-sm text-muted-foreground">
                  Chrome on macOS • İstanbul, Türkiye
                </p>
              </div>
              <Badge variant="outline">Aktif</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Tüm Diğer Oturumları Sonlandır
          </Button>
        </CardContent>
      </Card>

      {/* Şifre Değiştir */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Şifre Yönetimi</span>
          </CardTitle>
          <CardDescription>
            Şifrenizi düzenli olarak değiştirerek hesabınızı güvende tutun.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">
            Şifre Değiştir
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
