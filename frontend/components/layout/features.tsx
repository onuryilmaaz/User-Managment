"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Zap,
  Lock,
  Globe,
  BarChart3,
  Smartphone,
  Key,
  UserCheck,
  Sparkles,
  Star,
  Crown,
  Gem,
  Rocket,
  CloudLightningIcon as Lightning,
  Award,
} from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Shield,
    title: "Gelişmiş Güvenlik",
    description:
      "2FA, JWT token'lar ve şifreleme ile maksimum güvenlik sağlayın. Enterprise-grade koruma.",
    badge: "Güvenlik",
    gradient: "from-red-500 to-pink-600",
    bgGradient:
      "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
    borderGradient:
      "from-red-200/50 to-pink-200/50 dark:from-red-800/50 dark:to-pink-800/50",
    premium: true,
  },
  {
    icon: Users,
    title: "Kullanıcı Yönetimi",
    description:
      "Kullanıcıları kolayca yönetin, roller atayın ve izinleri kontrol edin. Sınırsız kullanıcı desteği.",
    badge: "Yönetim",
    gradient: "from-emerald-500 to-green-600",
    bgGradient:
      "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20",
    borderGradient:
      "from-emerald-200/50 to-green-200/50 dark:from-emerald-800/50 dark:to-green-800/50",
    premium: false,
  },
  {
    icon: Zap,
    title: "Hızlı Entegrasyon",
    description:
      "Dakikalar içinde mevcut uygulamanıza entegre edin. Plug-and-play çözüm.",
    badge: "Geliştirici",
    gradient: "from-yellow-500 to-orange-600",
    bgGradient:
      "from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
    borderGradient:
      "from-yellow-200/50 to-orange-200/50 dark:from-yellow-800/50 dark:to-orange-800/50",
    premium: false,
  },
  {
    icon: Lock,
    title: "Rol Tabanlı Erişim",
    description:
      "Granüler izin kontrolü ile hassas verileri koruyun. Çok katmanlı güvenlik sistemi.",
    badge: "Güvenlik",
    gradient: "from-purple-500 to-violet-600",
    bgGradient:
      "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
    borderGradient:
      "from-purple-200/50 to-violet-200/50 dark:from-purple-800/50 dark:to-violet-800/50",
    premium: true,
  },
  {
    icon: Globe,
    title: "Çoklu Platform",
    description:
      "Web, mobil ve API'ler için tek çözüm. Cross-platform uyumluluk garantisi.",
    badge: "Platform",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient:
      "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    borderGradient:
      "from-blue-200/50 to-cyan-200/50 dark:from-blue-800/50 dark:to-cyan-800/50",
    premium: false,
  },
  {
    icon: BarChart3,
    title: "Analitik & Raporlama",
    description:
      "Kullanıcı aktivitelerini izleyin ve detaylı raporlar alın. Real-time dashboard.",
    badge: "Analitik",
    gradient: "from-indigo-500 to-purple-600",
    bgGradient:
      "from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20",
    borderGradient:
      "from-indigo-200/50 to-purple-200/50 dark:from-indigo-800/50 dark:to-purple-800/50",
    premium: true,
  },
  {
    icon: Smartphone,
    title: "Mobil Uyumlu",
    description:
      "Responsive tasarım ile her cihazda mükemmel deneyim. Native app desteği.",
    badge: "Mobil",
    gradient: "from-teal-500 to-emerald-600",
    bgGradient:
      "from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20",
    borderGradient:
      "from-teal-200/50 to-emerald-200/50 dark:from-teal-800/50 dark:to-emerald-800/50",
    premium: false,
  },
  {
    icon: Key,
    title: "API Anahtarları",
    description:
      "Güvenli API erişimi için otomatik anahtar yönetimi. Rate limiting ve monitoring.",
    badge: "API",
    gradient: "from-slate-500 to-gray-600",
    bgGradient:
      "from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20",
    borderGradient:
      "from-slate-200/50 to-gray-200/50 dark:from-slate-800/50 dark:to-gray-800/50",
    premium: true,
  },
  {
    icon: UserCheck,
    title: "Sosyal Giriş",
    description:
      "Google, GitHub ve diğer platformlarla tek tıkla giriş. OAuth 2.0 desteği.",
    badge: "Sosyal",
    gradient: "from-pink-500 to-rose-600",
    bgGradient:
      "from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
    borderGradient:
      "from-pink-200/50 to-rose-200/50 dark:from-pink-800/50 dark:to-rose-800/50",
    premium: false,
  },
];

const badgeColors = {
  Güvenlik:
    "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/25",
  Yönetim:
    "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25",
  Geliştirici:
    "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg shadow-yellow-500/25",
  Platform:
    "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25",
  Analitik:
    "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25",
  Mobil:
    "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/25",
  API: "bg-gradient-to-r from-slate-500 to-gray-600 text-white shadow-lg shadow-slate-500/25",
  Sosyal:
    "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25",
};

export function Features() {
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
    <section className="relative py-24 bg-white dark:bg-slate-900 overflow-hidden">
      {/* Improved smooth transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-slate-50/50 to-transparent dark:from-slate-900 dark:via-slate-900/50 dark:to-transparent"></div>

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
                <span>Premium Özellikler</span>
                <Sparkles className="w-4 h-4 animate-bounce" />
              </div>
            </Badge>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
            <span className="block mb-2">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                Her İhtiyacınız İçin
              </span>
            </span>
            <span className="block relative">
              <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                Güçlü Özellikler
              </span>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-spin opacity-80"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-bounce opacity-80"></div>
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
            <span className="bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
              Modern uygulamalar için tasarlanmış kapsamlı kimlik doğrulama ve
              yetkilendirme çözümü.
            </span>
            <br />
            <span className="text-lg text-slate-500 dark:text-slate-400 mt-2 block">
              Enterprise-grade güvenlik ile premium deneyim.
            </span>
          </p>
        </div>

        {/* Premium Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredCard === index;

            return (
              <Card
                key={index}
                className={`group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 ${
                  feature.premium ? "ring-2 ring-yellow-400/50" : ""
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Premium Badge for Premium Features */}
                {feature.premium && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Dynamic Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                ></div>

                {/* Border Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.borderGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    {/* Premium Icon Container */}
                    <div className="relative group/icon">
                      <div
                        className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur opacity-40 group-hover/icon:opacity-60 transition-opacity duration-300`}
                      ></div>

                      {/* Floating sparkles */}
                      {isHovered && (
                        <>
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                        </>
                      )}
                    </div>

                    {/* Premium Badge */}
                    <Badge
                      className={`text-xs font-bold border-0 ${
                        badgeColors[feature.badge as keyof typeof badgeColors]
                      } hover:scale-105 transition-transform duration-200`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-slate-900 group-hover:to-slate-700 dark:group-hover:from-white dark:group-hover:to-slate-200 transition-all duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10">
                  <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                    {feature.description}
                  </CardDescription>

                  {/* Premium Features Indicator */}
                  {feature.premium && (
                    <div className="mt-4 flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl border border-yellow-200/50 dark:border-yellow-800/50">
                      <Gem className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                        Premium Özellik
                      </span>
                      <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
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

        {/* Premium CTA Section */}
        <div className="mt-20 text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl blur opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Rocket className="w-6 h-6 text-emerald-500 animate-bounce" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Tüm Özellikleri Keşfedin
                </h3>
                <Lightning className="w-6 h-6 text-emerald-500 animate-pulse" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                Premium özelliklerle uygulamanızı bir üst seviyeye taşıyın.
                Enterprise-grade güvenlik ve performans.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>14 gün ücretsiz deneme</span>
                <span>•</span>
                <span>Kredi kartı gerektirmez</span>
                <span>•</span>
                <span>Anında kurulum</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-800"></div>
    </section>
  );
}
