import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";

import { Metadata } from "next";
import { Hero } from "@/components/layout/hero";

// Sayfaya özel SEO metadata'sı
export const metadata: Metadata = {
  title: "Proje Adı - Modern Yönetim Paneli Çözümünüz",
  description:
    "Kullanıcılarınızı kolayca yönetin, rolleri atayın ve uygulamanızın kontrolünü ele alın. Hızlı, güvenli ve ölçeklenebilir altyapı.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />

      <Hero />

      <LandingFooter />
    </div>
  );
}
