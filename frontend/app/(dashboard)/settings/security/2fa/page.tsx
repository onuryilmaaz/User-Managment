"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QrCode, Shield, Copy, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function TwoFactorAuthPage() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secretKey] = useState("JBSWY3DPEHPK3PXP");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateQRCode = () => {
    // Gerçek uygulamada backend'den QR kod alınacak
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/AuthApp:user@example.com?secret=${secretKey}&issuer=AuthApp`;
    setQrCode(qrCodeUrl);
  };

  const enable2FA = () => {
    if (verificationCode.length !== 6) {
      toast.error("Lütfen 6 haneli doğrulama kodunu girin");
      return;
    }

    // Gerçek uygulamada backend'e istek gönderilecek
    setIs2FAEnabled(true);
    generateBackupCodes();
    setShowBackupCodes(true);
    toast.success("2FA başarıyla etkinleştirildi!");
  };

  const disable2FA = () => {
    if (!confirm("2FA'yı devre dışı bırakmak istediğinizden emin misiniz?"))
      return;

    setIs2FAEnabled(false);
    setQrCode("");
    setBackupCodes([]);
    setShowBackupCodes(false);
    toast.success("2FA devre dışı bırakıldı");
  };

  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
    }
    setBackupCodes(codes);
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    toast.success("Gizli anahtar kopyalandı");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadBackupCodes = () => {
    const content = `2FA Yedek Kodları\n\n${backupCodes.join(
      "\n"
    )}\n\nBu kodları güvenli bir yerde saklayın!`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "2fa-backup-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          İki Faktörlü Kimlik Doğrulama
        </h1>
        <p className="text-muted-foreground">
          Hesabınızın güvenliğini artırmak için 2FAyı etkinleştirin.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Durum Kartı */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              2FA Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">İki Faktörlü Kimlik Doğrulama</p>
                <p className="text-sm text-muted-foreground">
                  {is2FAEnabled
                    ? "Hesabınız 2FA ile korunuyor"
                    : "Hesabınız 2FA ile korunmuyor"}
                </p>
              </div>
              <Badge variant={is2FAEnabled ? "default" : "secondary"}>
                {is2FAEnabled ? "Etkin" : "Pasif"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {!is2FAEnabled ? (
          /* 2FA Etkinleştirme */
          <Card>
            <CardHeader>
              <CardTitle>2FAyı Etkinleştir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  2FAyı etkinleştirmek için bir authenticator uygulaması (Google
                  Authenticator, Authy vb.) gereklidir.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">1. QR Kodu Tarayın</h3>
                  <div className="flex justify-center">
                    {qrCode ? (
                      <Image
                        src={qrCode}
                        alt="QR Code"
                        width={200}
                        height={200}
                        className="border rounded"
                      />
                    ) : (
                      <div className="w-48 h-48 border-2 border-dashed border-muted-foreground/25 rounded flex items-center justify-center">
                        <div className="text-center">
                          <QrCode className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <Button
                            onClick={generateQRCode}
                            variant="outline"
                            size="sm"
                          >
                            QR Kod Oluştur
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">2. Manuel Giriş</h3>
                  <div className="space-y-2">
                    <Label>Gizli Anahtar</Label>
                    <div className="flex gap-2">
                      <Input value={secretKey} readOnly className="font-mono" />
                      <Button
                        onClick={copySecret}
                        variant="outline"
                        size="icon"
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">3. Doğrulama Kodu Girin</h3>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label htmlFor="verification-code">6 Haneli Kod</Label>
                    <Input
                      id="verification-code"
                      value={verificationCode}
                      onChange={(e) =>
                        setVerificationCode(
                          e.target.value.replace(/\D/g, "").slice(0, 6)
                        )
                      }
                      placeholder="123456"
                      className="font-mono text-center text-lg"
                      maxLength={6}
                    />
                  </div>
                  <Button
                    onClick={enable2FA}
                    disabled={verificationCode.length !== 6}
                  >
                    2FAyı Etkinleştir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* 2FA Yönetimi */
          <>
            <Card>
              <CardHeader>
                <CardTitle>2FA Yönetimi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    2FA başarıyla etkinleştirildi. Hesabınız artık daha güvenli!
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowBackupCodes(!showBackupCodes)}
                    variant="outline"
                  >
                    Yedek Kodları {showBackupCodes ? "Gizle" : "Göster"}
                  </Button>
                  <Button onClick={generateBackupCodes} variant="outline">
                    Yeni Yedek Kodları Oluştur
                  </Button>
                  <Button onClick={disable2FA} variant="destructive">
                    2FAyı Devre Dışı Bırak
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Yedek Kodları */}
            {showBackupCodes && (
              <Card>
                <CardHeader>
                  <CardTitle>Yedek Kodları</CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Bu kodları güvenli bir yerde saklayın. Her kod sadece bir
                      kez kullanılabilir.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {backupCodes.map((code, index) => (
                      <div
                        key={index}
                        className="p-2 bg-muted rounded font-mono text-center"
                      >
                        {code}
                      </div>
                    ))}
                  </div>

                  <Button onClick={downloadBackupCodes} variant="outline">
                    Kodları İndir
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
