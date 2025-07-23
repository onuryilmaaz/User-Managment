"use client";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { UserNav } from "./user-nav";
import { Zap } from "lucide-react";

export function LandingHeader() {
  const { user } = useAuthStore();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="hidden font-bold sm:inline-block text-xl">AuthFlow</span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        {!user && (
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#features" className="transition-colors hover:text-foreground/80">
              Özellikler
            </Link>
            <Link href="#pricing" className="transition-colors hover:text-foreground/80">
              Fiyatlandırma
            </Link>
            <Link href="/docs" className="transition-colors hover:text-foreground/80">
              Dokümantasyon
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80">
              İletişim
            </Link>
          </nav>
        )}

        <div className="flex flex-1 items-center justify-end space-x-4">
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
                className={buttonVariants({ variant: "ghost" })}
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ variant: "default" })}
              >
                Ücretsiz Başla
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
