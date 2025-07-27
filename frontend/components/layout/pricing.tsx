"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Star,
  Crown,
  Zap,
  Shield,
  Rocket,
  Sparkles,
  Award,
  Gem,
  CloudLightningIcon as Lightning,
  Users,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const plans = [
  {
    name: "Başlangıç",
    price: "Ücretsiz",
    description: "Küçük projeler için mükemmel başlangıç paketi",
    features: [
      "1,000 aktif kullanıcı",
      "Temel kimlik doğrulama",
      "Email/şifre girişi",
      "Sosyal medya girişi",
      "Temel dashboard",
      "Community destek",
    ],
    popular: false,
    cta: "Ücretsiz Başla",
    gradient: "from-slate-500 to-gray-600",
    bgGradient: "from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900",
    borderColor: "border-slate-200 dark:border-slate-700",
    icon: Users,
  },
  {
    name: "Profesyonel",
    price: "₺299",
    period: "/ay",
    description: "Büyüyen işletmeler için gelişmiş özellikler",
    features: [
      "10,000 aktif kullanıcı",
      "Gelişmiş güvenlik (2FA)",
      "Rol tabanlı erişim",
      "API anahtarları",
      "Analitik & raporlama",
      "Öncelikli destek",
      "Custom branding",
      "SSO entegrasyonu",
    ],
    popular: true,
    cta: "Profesyonel'i Seç",
    gradient: "from-emerald-500 to-green-600",
    bgGradient:
      "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    icon: Rocket,
  },
  {
    name: "Enterprise",
    price: "Özel Fiyat",
    description: "Büyük organizasyonlar için tam çözüm",
    features: [
      "Sınırsız kullanıcı",
      "Advanced security suite",
      "Custom integrations",
      "Dedicated support",
      "SLA garantisi",
      "On-premise deployment",
      "Advanced analytics",
      "Custom development",
    ],
    popular: false,
    cta: "İletişime Geç",
    gradient: "from-purple-500 to-violet-600",
    bgGradient:
      "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    icon: Crown,
  },
];

export function Pricing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Smooth transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-slate-50/50 to-transparent dark:from-slate-900 dark:via-slate-850/50 dark:to-transparent"></div>

      {/* Premium Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/15 to-green-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-cyan-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Interactive mouse follower */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-400/5 to-green-400/5 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-400/40 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-pink-400/40 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Premium Header Section */}
        <div className="text-center mb-20">
          <div className="mb-8 flex justify-center">
            <Badge className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white px-6 py-3 text-sm font-bold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 border-0">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <Star className="w-4 h-4 animate-pulse" />
                <span>Fiyatlandırma</span>
                <Sparkles className="w-4 h-4 animate-bounce" />
              </div>
            </Badge>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
            <span className="block mb-2">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                Size Uygun
              </span>
            </span>
            <span className="block relative">
              <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                Planı Seçin
              </span>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-spin opacity-80"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-bounce opacity-80"></div>
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
            <span className="bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
              İhtiyacınıza göre ölçeklenebilir çözümler. Küçük projelerden
              enterprise seviyeye kadar.
            </span>
            <br />
            <span className="text-lg text-slate-500 dark:text-slate-400 mt-2 block">
              14 gün ücretsiz deneme, kredi kartı gerektirmez.
            </span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredCard === index;
            const isPopular = plan.popular;

            return (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-white dark:bg-slate-900 border-2 shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 ${
                  isPopular
                    ? "ring-4 ring-emerald-400/50 border-emerald-300 dark:border-emerald-600 scale-105"
                    : `${plan.borderColor} hover:border-emerald-300 dark:hover:border-emerald-600`
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      <span>En Popüler</span>
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Dynamic Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                ></div>

                <CardHeader className="relative z-10 text-center pb-8 pt-8">
                  {/* Premium Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="relative group/icon">
                      <div
                        className={`p-4 bg-gradient-to-br ${plan.gradient} rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-2xl blur opacity-40 group-hover/icon:opacity-60 transition-opacity duration-300`}
                      ></div>

                      {/* Floating sparkles */}
                      {isHovered && (
                        <>
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                        </>
                      )}
                    </div>
                  </div>

                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </CardTitle>

                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span
                        className={`text-4xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                      >
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <CardDescription className="text-slate-600 dark:text-slate-300 text-base font-medium">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 px-8 pb-8">
                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`p-1 bg-gradient-to-br ${plan.gradient} rounded-full flex-shrink-0`}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={plan.name === "Enterprise" ? "/contact" : "/register"}
                  >
                    <Button
                      className={`w-full py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl ${
                        isPopular
                          ? `bg-gradient-to-r ${plan.gradient} hover:from-emerald-600 hover:to-green-700 text-white border-0`
                          : `bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border-2 ${plan.borderColor} hover:border-emerald-300 dark:hover:border-emerald-600 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400`
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {isPopular && (
                          <Lightning className="w-5 h-5 animate-pulse" />
                        )}
                        <span>{plan.cta}</span>
                        {isPopular && (
                          <Rocket className="w-5 h-5 animate-bounce" />
                        )}
                      </div>
                    </Button>
                  </Link>

                  {/* Additional Info for Popular Plan */}
                  {isPopular && (
                    <div className="mt-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                        <Award className="w-4 h-4" />
                        <span>30 gün para iade garantisi</span>
                        <Gem className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Interactive Elements */}
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-border animate-pulse"></div>

                    {/* Corner sparkles */}
                    <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping delay-100"></div>
                    <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full animate-ping delay-200"></div>
                    <div className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Premium Features Comparison */}
        <div className="mt-20 text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl blur opacity-20 animate-pulse"></div>
            <div className="relative bg-white dark:bg-slate-900 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-emerald-500 animate-bounce" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Tüm Planlar İçin
                </h3>
                <Shield className="w-6 h-6 text-emerald-500 animate-pulse" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                SSL sertifikası, 99.9% uptime garantisi, GDPR uyumluluğu ve 24/7
                monitoring tüm planlarda dahil.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>Ücretsiz SSL</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>GDPR Uyumlu</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-emerald-50/30 to-emerald-100/50 dark:from-transparent dark:via-emerald-950/20 dark:to-emerald-900/30"></div>
    </section>
  );
}
