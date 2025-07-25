"use client";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

export function Hero() {
  const { user } = useAuthStore();

  return (
    <>
      {user ? (
        // Giriş yapmış kullanıcı için görünüm
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl text-center">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-10">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user.profilePicture || undefined}
                    alt={`@${user.username || user.name}`}
                  />
                </Avatar>

                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Hoş Geldin, {user.name}!
                  </h1>
                  <p className="text-muted-foreground">
                    Yönetim paneline başarıyla giriş yaptın.
                  </p>
                </div>

                <div className="flex w-full max-w-sm flex-col space-y-3 pt-6 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "lg",
                      className: "w-full",
                    })}
                  >
                    Dashboard`a Git
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        // Giriş yapmamış kullanıcı için SaaS landing sayfası
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="container relative z-10 px-4 py-24 mx-auto text-center lg:py-32">
              <div className="mx-auto max-w-4xl">
                <Badge variant="secondary" className="mb-6 px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Yeni: Gelişmiş Güvenlik Özellikleri
                </Badge>
                
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
                  Kimlik Doğrulamayı
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Basitleştirin</span>
                </h1>
                
                <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Güvenli, ölçeklenebilir ve kolay entegre edilebilir kimlik doğrulama sistemi. 
                  Kullanıcı yönetimi, rol tabanlı erişim kontrolü ve daha fazlası.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/register"
                    className={buttonVariants({ size: "lg", className: "px-8 py-4 text-lg" })}
                  >
                    Ücretsiz Başlayın
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    href="/login"
                    className={buttonVariants({ 
                      variant: "outline", 
                      size: "lg", 
                      className: "px-8 py-4 text-lg" 
                    })}
                  >
                    Demo İzleyin
                  </Link>
                </div>
                
                <div className="mt-16 flex justify-center items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-500" />
                    SOC 2 Uyumlu
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    10K+ Aktif Kullanıcı
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-emerald-500" />
                    99.9% Uptime
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-3xl opacity-20"></div>
          </section>
        </main>
      )}
    </>
  );
}
