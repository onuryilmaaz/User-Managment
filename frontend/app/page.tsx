import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { Hero } from "@/components/layout/hero";
import type { Metadata } from "next";
import { Features } from "@/components/layout/features";
import { Pricing } from "@/components/layout/pricing";
import { CTA } from "@/components/layout/cta";

export const metadata: Metadata = {
  title: "AuthFlow - Modern Kimlik Doğrulama Çözümünüz",
  description:
    "Güvenli, ölçeklenebilir ve kolay entegre edilebilir kimlik doğrulama sistemi. Kullanıcı yönetimi, rol tabanlı erişim kontrolü ve daha fazlası.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <LandingFooter />
    </div>
  );
}
