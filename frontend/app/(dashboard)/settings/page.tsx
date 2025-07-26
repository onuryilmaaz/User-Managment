"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { User, Shield, Lock, Palette, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 dark:from-slate-100 dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
              Ayarlar & Tercihler
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
              Hesabınızı kişiselleştirin ve güvenliğinizi artırın
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Şifre Değiştir */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">
                    Şifre Değiştir
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Hesap güvenliğinizi artırın
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Dialog
                open={passwordDialogOpen}
                onOpenChange={setPasswordDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg">
                    Şifre Değiştir
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <Lock className="h-5 w-5" />
                      <span>Şifre Değiştir</span>
                    </DialogTitle>
                    <DialogDescription>
                      Güvenliğiniz için mevcut şifrenizi doğrulayın ve yeni
                      şifrenizi belirleyin.
                    </DialogDescription>
                  </DialogHeader>
                  <ChangePasswordForm />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Tema Ayarları */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Tema</CardTitle>
                  <CardDescription className="text-sm">
                    Görünüm tercihlerinizi ayarlayın
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="flex flex-col items-center space-y-1 h-auto py-3"
                >
                  <Sun className="h-4 w-4" />
                  <span className="text-xs">Açık</span>
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="flex flex-col items-center space-y-1 h-auto py-3"
                >
                  <Moon className="h-4 w-4" />
                  <span className="text-xs">Koyu</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Güvenlik Özeti */}
        <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-xl">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">
                  Güvenlik Durumu
                </CardTitle>
                <CardDescription>
                  Hesap güvenliğinizin genel durumu
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">E-posta Doğrulandı</p>
                  <p className="text-xs text-slate-500">Hesabınız aktif</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Güçlü Şifre</p>
                  <p className="text-xs text-slate-500">
                    Son 30 gün içinde güncellendi
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
