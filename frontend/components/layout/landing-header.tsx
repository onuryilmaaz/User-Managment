"use client";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { UserNav } from "./user-nav";

export function LandingHeader() {
  const { user } = useAuthStore();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Proje Adı</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Eğer kullanıcı giriş yapmışsa, profil ve çıkış butonları göster */}

          {user ? (
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <UserNav />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Link
                href="/login"
                className={buttonVariants({ variant: "secondary" })}
              >
                Giriş Yap
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
