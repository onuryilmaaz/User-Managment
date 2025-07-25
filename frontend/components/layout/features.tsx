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
  "Güvenlik": "bg-black text-white dark:bg-white dark:text-black",
  "Yönetim": "bg-green-500 text-white",
  "Geliştirici": "bg-green-600 text-white",
  "Platform": "bg-gray-500 text-white",
  "Analitik": "bg-gray-600 text-white",
  "Mobil": "bg-gray-700 text-white",
  "API": "bg-gray-800 text-white",
  "Sosyal": "bg-green-400 text-white"
};

export function Features() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-green-500 text-white">
            Özellikler
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
            Her İhtiyacınız İçin
            <span className="text-green-500"> Güçlü Özellikler</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Modern uygulamalar için tasarlanmış kapsamlı kimlik doğrulama ve yetkilendirme çözümü.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 bg-green-500 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${badgeColors[feature.badge as keyof typeof badgeColors]}`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-black dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}