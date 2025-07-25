"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 bg-green-500">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4 sm:text-4xl lg:text-5xl">
          Hemen Başlayın
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Güvenli kimlik doğrulama sisteminizi dakikalar içinde kurun ve uygulamanızı bir sonraki seviyeye taşıyın.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-green-500 font-medium"
            >
              Ücretsiz Deneyin
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="ghost"
              className="px-8 py-4 text-lg text-white hover:bg-white/10 font-medium"
            >
              İletişime Geçin
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 text-white/80 text-sm">
          <p>Kredi kartı gerekmez • 14 gün ücretsiz deneme • İstediğiniz zaman iptal edin</p>
        </div>
      </div>
    </section>
  );
}