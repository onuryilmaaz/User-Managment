"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Star,
  Sparkles,
  Rocket,
  CloudLightningIcon as Lightning,
  Crown,
  Shield,
  Zap,
  Users,
  Award,
  Gem,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function CTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-br from-emerald-100/50 via-green-50/30 to-emerald-50/20 dark:from-emerald-900/30 dark:via-emerald-950/20 dark:to-slate-900 overflow-hidden">
      {/* Smooth transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-100/50 via-emerald-50/30 to-transparent dark:from-emerald-900/30 dark:via-emerald-950/20 dark:to-transparent"></div>

      {/* Ultra Premium Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/25 to-green-600/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-400/15 to-green-600/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Interactive mouse follower */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-green-400/10 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-emerald-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-300 opacity-60"></div>
        <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce delay-700 opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-green-500 rounded-full animate-bounce delay-1000 opacity-60"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Premium Badge */}
          <div className="mb-8 flex justify-center">
            <Badge className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white px-8 py-4 text-base font-bold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 border-0">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <Rocket className="w-5 h-5 animate-bounce" />
                <span>Hemen Başlayın</span>
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </Badge>
          </div>

          {/* Hero Title */}
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-8 leading-tight">
            <span className="block mb-2">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                Uygulamanızı
              </span>
            </span>
            <span className="block relative">
              <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                Güçlendirin
              </span>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-spin opacity-80"></div>
              <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-bounce opacity-80"></div>
            </span>
          </h2>

          {/* Enhanced Description */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            <span className="bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
              Dakikalar içinde modern kimlik doğrulama sistemi kurun ve
              kullanıcılarınıza güvenli deneyim sunun.
            </span>
            <br />
            <span className="text-lg text-slate-500 dark:text-slate-400 mt-2 block">
              14 gün ücretsiz deneme ile risk almadan başlayın.
            </span>
          </p>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/register">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white px-12 py-8 text-2xl font-bold shadow-3xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-110 border-0 rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-4">
                  <Lightning className="w-7 h-7 animate-pulse" />
                  <span>Ücretsiz Başlayın</span>
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-200" />
                </div>
              </Button>
            </Link>

            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-700/90 backdrop-blur-sm border-3 border-emerald-200/50 dark:border-emerald-600/50 hover:border-emerald-400/70 dark:hover:border-emerald-500/70 px-12 py-8 text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-950/30 dark:to-green-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-4">
                  <Shield className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                    Demo İzle
                  </span>
                </div>
              </Button>
            </Link>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16">
            {/* Trusted by Companies */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl rounded-3xl p-6 border border-emerald-200/50 dark:border-emerald-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-1">
                  500+
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-semibold">
                  Şirket
                </div>
              </div>
            </div>

            {/* Active Users */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl rounded-3xl p-6 border border-emerald-200/50 dark:border-emerald-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                  1M+
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-semibold">
                  Kullanıcı
                </div>
              </div>
            </div>

            {/* Uptime */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl rounded-3xl p-6 border border-emerald-200/50 dark:border-emerald-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  99.9%
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-semibold">
                  Uptime
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl rounded-3xl p-6 border border-emerald-200/50 dark:border-emerald-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-1">
                  24/7
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-semibold">
                  Destek
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-medium">5.0 Rating</span>
            </div>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">SOC 2 Compliant</span>
            </div>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="font-medium">ISO 27001</span>
            </div>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Gem className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Enterprise Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="group relative">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce cursor-pointer hover:scale-110 transition-transform duration-200">
            <ArrowRight className="w-7 h-7 text-white rotate-90" />
          </div>
          <div className="absolute -inset-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-200"></div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="group relative">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse cursor-pointer hover:scale-110 transition-transform duration-200">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div className="absolute -inset-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-200"></div>
        </div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-slate-50/30 to-slate-100/50 dark:from-transparent dark:via-slate-900/30 dark:to-slate-800/50"></div>
    </section>
  );
}
