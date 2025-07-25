"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Başlangıç",
    price: "Ücretsiz",
    description: "Küçük projeler için ideal",
    features: [
      "1,000 aylık aktif kullanıcı",
      "Temel kimlik doğrulama",
      "E-posta desteği",
      "Temel analitik"
    ],
    popular: false
  },
  {
    name: "Profesyonel",
    price: "₺299",
    description: "Büyüyen işletmeler için",
    features: [
      "10,000 aylık aktif kullanıcı",
      "Gelişmiş güvenlik özellikleri",
      "2FA desteği",
      "Öncelikli destek",
      "Detaylı analitik",
      "API erişimi"
    ],
    popular: true
  },
  {
    name: "Kurumsal",
    price: "Özel",
    description: "Büyük organizasyonlar için",
    features: [
      "Sınırsız kullanıcı",
      "Özel entegrasyonlar",
      "Dedicated support",
      "SLA garantisi",
      "Özel raporlama",
      "On-premise seçeneği"
    ],
    popular: false
  }
];

export function Pricing() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-green-500 text-white">
            Fiyatlandırma
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
            Size Uygun
            <span className="text-green-500"> Çözümler</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            İhtiyaçlarınıza göre tasarlanmış esnek fiyatlandırma seçenekleri.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-green-500 shadow-xl scale-105' : 'border-gray-200 dark:border-gray-800'} bg-white dark:bg-black`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    En Popüler
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-black dark:text-white">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-black dark:text-white">{plan.price}</span>
                  {plan.price !== "Ücretsiz" && plan.price !== "Özel" && (
                    <span className="text-gray-600 dark:text-gray-400">/ay</span>
                  )}
                </div>
                <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-green-500 hover:bg-green-600 text-white' : 'border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'}`}
                  size="lg"
                >
                  {plan.price === "Özel" ? "İletişime Geçin" : "Başlayın"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}