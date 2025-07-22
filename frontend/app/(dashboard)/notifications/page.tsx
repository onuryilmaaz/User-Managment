"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Trash2, Settings } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      _id: "1",
      title: "Hoş geldiniz!",
      message:
        "Hesabınız başarıyla oluşturuldu. Profilinizi tamamlamayı unutmayın.",
      type: "success",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 dakika önce
    },
    {
      _id: "2",
      title: "Güvenlik Uyarısı",
      message:
        "Hesabınıza yeni bir cihazdan giriş yapıldı. Bu siz değilseniz şifrenizi değiştirin.",
      type: "warning",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 saat önce
    },
    {
      _id: "3",
      title: "Profil Güncellendi",
      message: "Profil bilgileriniz başarıyla güncellendi.",
      type: "info",
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 gün önce
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bildirimler</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} okunmamış bildirim`
              : "Tüm bildirimler okundu"}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/settings/notifications">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Ayarlar
            </Button>
          </Link>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline" size="sm">
              <Check className="mr-2 h-4 w-4" />
              Tümünü Okundu İşaretle
            </Button>
          )}
          {notifications.length > 0 && (
            <Button onClick={clearAll} variant="outline" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Tümünü Temizle
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Bildirim yok</h3>
              <p className="text-muted-foreground text-center">
                Henüz hiç bildiriminiz bulunmuyor.
              </p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification._id}
              className={`transition-all hover:shadow-md ${
                !notification.isRead ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <Badge
                        className={getNotificationColor(notification.type)}
                      >
                        {notification.type === "success" && "Başarılı"}
                        {notification.type === "warning" && "Uyarı"}
                        {notification.type === "error" && "Hata"}
                        {notification.type === "info" && "Bilgi"}
                      </Badge>
                      {!notification.isRead && (
                        <Badge variant="destructive" className="text-xs">
                          Yeni
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                        locale: tr,
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!notification.isRead && (
                      <Button
                        onClick={() => markAsRead(notification._id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      onClick={() => deleteNotification(notification._id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
