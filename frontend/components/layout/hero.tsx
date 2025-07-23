"use client";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import Link from "next/link"; // HATA BURADAYDI, DOĞRUSU BU
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function Hero() {
  const { user } = useAuthStore();

  return (
    <>
      {user ? (
        // --- GİRİŞ YAPMIŞ KULLANICI İÇİN GÖRÜNÜM ---
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl text-center">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-10">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user.profilePicture || undefined}
                    alt={`@${user.username || user.name}`}
                  />
                </Avatar>

                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Hoş Geldin, {user.name}!
                  </h1>
                  <p className="text-muted-foreground">
                    Yönetim paneline başarıyla giriş yaptın.
                  </p>
                </div>

                <div className="flex w-full max-w-sm flex-col space-y-3 pt-6 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "lg",
                      className: "w-full",
                    })}
                  >
                    Dashboard`a Git
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        // --- GİRİŞ YAPMAMIŞ KULLANICI İÇİN GÖRÜNÜM ---
        <main className="flex-1">
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

          <section
            id="features"
            className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
          >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1]">Özellikler</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground">
                Bu platform, modern web uygulamaları için tasarlanmış güçlü
                özellikler sunar.
              </p>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
