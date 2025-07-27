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
import {
  Shield,
  Lock,
  Palette,
  Moon,
  Sun,
  Zap,
  Crown,
  Eye,
  Key,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Premium Quick Actions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Şifre Değiştir - Premium */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-red-50/90 dark:from-slate-900/90 dark:to-red-950/40 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Lock className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                      Şifre Değiştir
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
                      Hesap güvenliğinizi maksimum seviyeye çıkarın
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200/50 dark:border-red-800/50">
                  <Shield className="w-5 h-5 text-red-500" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                      Son güncelleme
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      30 gün önce
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-red-600">
                      Güçlü
                    </span>
                  </div>
                </div>

                <Dialog
                  open={passwordDialogOpen}
                  onOpenChange={setPasswordDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-12">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-2">
                        <Key className="w-5 h-5" />
                        <span className="font-semibold">Şifre Değiştir</span>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-gradient-to-br from-white/95 to-slate-50/95 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl border-0 shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-xl font-bold">
                        <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg">
                          <Lock className="h-5 w-5 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                          Şifre Değiştir
                        </span>
                      </DialogTitle>
                      <DialogDescription className="text-slate-600 dark:text-slate-400 font-medium">
                        Güvenliğiniz için mevcut şifrenizi doğrulayın ve yeni
                        şifrenizi belirleyin.
                      </DialogDescription>
                    </DialogHeader>
                    <ChangePasswordForm />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Tema Ayarları - Premium */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-violet-50/90 dark:from-slate-900/90 dark:to-violet-950/40 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-400/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="p-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Palette className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      Tema Ayarları
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
                      Görünüm tercihlerinizi kişiselleştirin
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-violet-50 dark:bg-violet-950/20 rounded-xl border border-violet-200/50 dark:border-violet-800/50">
                  <Eye className="w-5 h-5 text-violet-500" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-violet-900 dark:text-violet-100">
                      Aktif tema
                    </p>
                    <p className="text-xs text-violet-600 dark:text-violet-400 capitalize">
                      {theme || "sistem"}
                    </p>
                  </div>
                  <Crown className="w-4 h-4 text-violet-500" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => setTheme("light")}
                    className={`group relative overflow-hidden h-16 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                      theme === "light"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg hover:shadow-xl"
                        : "hover:bg-yellow-50 dark:hover:bg-yellow-950/20 hover:border-yellow-300 dark:hover:border-yellow-600"
                    }`}
                  >
                    <Sun className="h-5 w-5" />
                    <span className="text-sm font-semibold">Açık Tema</span>
                  </Button>

                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setTheme("dark")}
                    className={`group relative overflow-hidden h-16 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-lg hover:shadow-xl"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <Moon className="h-5 w-5" />
                    <span className="text-sm font-semibold">Koyu Tema</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
