"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  Clock,
  LogOut,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { toast } from "sonner";

interface Session {
  id: string;
  deviceType: "desktop" | "mobile" | "tablet";
  deviceName: string;
  browser: string;
  os: string;
  location: string;
  ipAddress: string;
  lastActivity: string;
  isCurrent: boolean;
}

export default function ActiveSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      deviceType: "desktop",
      deviceName: "MacBook Pro",
      browser: "Chrome 120.0",
      os: "macOS 14.2",
      location: "İstanbul, Türkiye",
      ipAddress: "192.168.1.100",
      lastActivity: new Date().toISOString(),
      isCurrent: true,
    },
    {
      id: "2",
      deviceType: "mobile",
      deviceName: "iPhone 15",
      browser: "Safari 17.0",
      os: "iOS 17.2",
      location: "İstanbul, Türkiye",
      ipAddress: "192.168.1.101",
      lastActivity: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isCurrent: false,
    },
    {
      id: "3",
      deviceType: "tablet",
      deviceName: "iPad Air",
      browser: "Safari 17.0",
      os: "iPadOS 17.2",
      location: "Ankara, Türkiye",
      ipAddress: "10.0.0.50",
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      isCurrent: false,
    },
  ]);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone className="h-5 w-5" />;
      case "tablet":
        return <Tablet className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  const terminateSession = (sessionId: string) => {
    if (!confirm("Bu oturumu sonlandırmak istediğinizden emin misiniz?"))
      return;

    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    toast.success("Oturum sonlandırıldı");
  };

  const terminateAllOtherSessions = () => {
    if (
      !confirm("Diğer tüm oturumları sonlandırmak istediğinizden emin misiniz?")
    )
      return;

    setSessions((prev) => prev.filter((s) => s.isCurrent));
    toast.success("Diğer tüm oturumlar sonlandırıldı");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Aktif Oturumlar</h1>
          <p className="text-muted-foreground">
            Hesabınıza bağlı tüm cihazları görüntüleyin ve yönetin.
          </p>
        </div>
        <Button
          onClick={terminateAllOtherSessions}
          variant="destructive"
          disabled={sessions.filter((s) => !s.isCurrent).length === 0}
        >
          Diğer Oturumları Sonlandır
        </Button>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-muted rounded-lg">
                    {getDeviceIcon(session.deviceType)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{session.deviceName}</h3>
                      {session.isCurrent && (
                        <Badge variant="default">Mevcut Oturum</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {session.browser} • {session.os}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {session.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(session.lastActivity), {
                          addSuffix: true,
                          locale: tr,
                        })}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      IP: {session.ipAddress}
                    </p>
                  </div>
                </div>
                {!session.isCurrent && (
                  <Button
                    onClick={() => terminateSession(session.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sonlandır
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sessions.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Monitor className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aktif oturum yok</h3>
            <p className="text-muted-foreground text-center">
              Şu anda hiç aktif oturumunuz bulunmuyor.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
