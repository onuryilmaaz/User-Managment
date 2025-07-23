"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  UserCheck
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Gelişmiş Güvenlik",
    description: "2FA, JWT token'lar ve şifreleme ile maksimum güvenlik sağlayın.",
    badge: "Güvenlik"
  },
  {
    icon: Users,
    title: "Kullanıcı Yönetimi",
    description: "Kullanıcıları kolayca yönetin, roller atayın ve izinleri kontrol edin.",
    badge: "Yönetim"
  },
  {
    icon: Zap,
    title: "Hızlı Entegrasyon",
    description: "Dakikalar içinde mevcut uygulamanıza entegre edin.",
    badge: "Geliştirici"
  },
  {
    icon: Lock,
    title: "Rol Tabanlı Erişim",
    description: "Granüler izin kontrolü ile hassas verileri koruyun.",
    badge: "Güvenlik"
  },
  {
    icon: Globe,
    title: "Çoklu Platform",
    description: "Web, mobil ve API'ler için tek çözüm.",
    badge: "Platform"
  },
  {
    icon: BarChart3,
    title: "Analitik & Raporlama",
    description: "Kullanıcı aktivitelerini izleyin ve detaylı raporlar alın.",
    badge: "Analitik"
  },
  {
    icon: Smartphone,
    title: "Mobil Uyumlu",
    description: "Responsive tasarım ile her cihazda mükemmel deneyim.",
    badge: "Mobil"
  },
  {
    icon: Key,
    title: "API Anahtarları",
    description: "Güvenli API erişimi için otomatik anahtar yönetimi.",
    badge: "API"
  },
  {
    icon: UserCheck,
    title: "Sosyal Giriş",
    description: "Google, GitHub ve diğer platformlarla tek tıkla giriş.",
    badge: "Sosyal"
  }
];

const badgeColors = {
  "Güvenlik": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Yönetim": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Geliştirici": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Platform": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Analitik": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Mobil": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  "API": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Sosyal": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
};

export function Features() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Özellikler
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
            Her İhtiyacınız İçin
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Güçlü Özellikler</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Modern uygulamalar için tasarlanmış kapsamlı kimlik doğrulama ve yetkilendirme çözümü.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${badgeColors[feature.badge as keyof typeof badgeColors]}`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}