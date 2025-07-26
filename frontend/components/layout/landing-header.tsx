"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { UserNav } from "./user-nav";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { ThemeToggle } from "./theme-toggle";

export function LandingHeader() {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-black/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-xl text-green-500">AuthFlow</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
          >
            Özellikler
          </Link>
          <Link
            href="#pricing"
            className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
          >
            Fiyatlandırma
          </Link>
          <Link
            href="#contact"
            className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
          >
            İletişim
          </Link>
        </nav>

        {/* Kullanıcı giriş yapmışsa UserNav, yapmamışsa giriş/kayıt butonları */}
        {user ? (
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <UserNav />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-black dark:text-white hover:text-green-500"
              >
                Giriş Yap
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Başlayın
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
