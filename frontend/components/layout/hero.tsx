"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-black">
      <div className="container px-4 mx-auto">
        <div className="relative z-10 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Premium Badge */}
            <Badge className="mb-6 bg-green-500 text-white px-4 py-2 text-sm font-medium">
              🚀 Premium Auth Solution
            </Badge>
            
            {/* Hero Title */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
              Kimlik Doğrulamayı
              <span className="text-green-500"> Basitleştirin</span>
            </h1>
            
            {/* Hero Description */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Modern, güvenli ve ölçeklenebilir kimlik doğrulama sistemi ile uygulamanızı güçlendirin. 
              Dakikalar içinde entegre edin, yıllarca güvenle kullanın.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-medium shadow-lg">
                  Ücretsiz Başlayın
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="border-gray-300 dark:border-gray-700 px-8 py-4 text-lg font-medium">
                  Giriş Yapın
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-500" />
                <span>10,000+ Aktif Kullanıcı</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-green-500" />
                <span>99.9% Uptime Garantisi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-10"></div>
    </section>
  );
}
