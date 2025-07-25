"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Başlangıç",
    price: "Ücretsiz",
    description: "Küçük projeler için mükemmel",
    features: [
      "1,000 aylık aktif kullanıcı",
      "Temel kimlik doğrulama",
      "E-posta desteği",
      "Temel analitik",
      "Sosyal giriş (2 platform)"
    ],
    cta: "Ücretsiz Başla",
    popular: false
  },
  {
    name: "Profesyonel",
    price: "$29",
    period: "/ay",
    description: "Büyüyen işletmeler için",
    features: [
      "10,000 aylık aktif kullanıcı",
      "Gelişmiş güvenlik özellikleri",
      "Rol tabanlı erişim kontrolü",
      "Öncelikli destek",
      "Tüm sosyal giriş seçenekleri",
      "API erişimi",
      "Özel branding"
    ],
    cta: "Profesyonel'i Seç",
    popular: true
  },
  {
    name: "Kurumsal",
    price: "Özel",
    description: "Büyük organizasyonlar için",
    features: [
      "Sınırsız kullanıcı",
      "Özel güvenlik yapılandırması",
      "Dedicated support",
      "SLA garantisi",
      "On-premise deployment",
      "Özel entegrasyonlar",
      "Compliance sertifikaları"
    ],
    cta: "İletişime Geç",
    popular: false
  }
];

export function Pricing() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Fiyatlandırma
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
            Her Bütçeye Uygun
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Çözümler</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            İhtiyaçlarınıza göre ölçeklenen esnek fiyatlandırma seçenekleri.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-green-500 shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    En Popüler
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
                <CardDescription className="text-base mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href={plan.name === 'Kurumsal' ? '/contact' : '/register'}>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}