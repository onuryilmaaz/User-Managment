import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid place-content-center gap-6 pb-8 pt-6 text-center md:py-10">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Kullanıcı Yönetimini <br className="hidden sm:inline" />
              Basitleştirin ve Güçlendirin
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Uygulamanız için ihtiyaç duyduğunuz tüm kimlik doğrulama ve
              yetkilendirme özelliklerini tek bir yerde sunuyoruz.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/register" className={buttonVariants({ size: "lg" })}>
              Ücretsiz Başla
            </Link>
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Giriş Yap
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          {/*!! BU DIV'İ KONTROL EDİN !!*/}
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1]">Özellikler</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground">
              Bu platform, modern web uygulamaları için tasarlanmış güçlü
              özellikler sunar.
            </p>
          </div>
          {/* Buraya özellik kartları eklenebilir */}
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
