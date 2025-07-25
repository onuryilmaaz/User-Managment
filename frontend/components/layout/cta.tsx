"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-600">
      <div className="container px-4 mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-6">
            Bugün Başlayın ve Farkı Görün
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Dakikalar içinde kurulum yapın ve kullanıcılarınıza güvenli, 
            sorunsuz bir deneyim sunmaya başlayın.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                <Zap className="mr-2 w-5 h-5" />
                Ücretsiz Başlayın
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-green-600"
              >
                Satış Ekibiyle Konuşun
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 text-green-100 text-sm">
            <p>✓ Kredi kartı gerekmez  ✓ 14 gün ücretsiz deneme  ✓ Anında kurulum</p>
          </div>
        </div>
      </div>
    </section>
  );
}