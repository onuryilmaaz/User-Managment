// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Zap } from "lucide-react";
// import { UserNav } from "./user-nav";
// import { useAuthStore } from "@/lib/hooks/use-auth.store";
// import { ThemeToggle } from "./theme-toggle";

// export function LandingHeader() {
//   const { user } = useAuthStore();

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-black/95 backdrop-blur-md">
//       <div className="container flex h-16 items-center justify-between px-4">
//         <Link href="/" className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
//             <Zap className="h-4 w-4 text-white" />
//           </div>
//           <span className="font-bold text-xl text-green-500">AuthFlow</span>
//         </Link>

//         <nav className="hidden md:flex items-center space-x-8">
//           <Link
//             href="#features"
//             className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
//           >
//             Özellikler
//           </Link>
//           <Link
//             href="#pricing"
//             className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
//           >
//             Fiyatlandırma
//           </Link>
//           <Link
//             href="#contact"
//             className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
//           >
//             İletişim
//           </Link>
//         </nav>

//         {/* Kullanıcı giriş yapmışsa UserNav, yapmamışsa giriş/kayıt butonları */}
//         {user ? (
//           <div className="flex items-center space-x-4">
//             <ThemeToggle />
//             <UserNav />
//           </div>
//         ) : (
//           <div className="flex items-center space-x-4">
//             <ThemeToggle />
//             <Link href="/login">
//               <Button
//                 variant="ghost"
//                 className="text-black dark:text-white hover:text-green-500"
//               >
//                 Giriş Yap
//               </Button>
//             </Link>
//             <Link href="/register">
//               <Button className="bg-green-500 hover:bg-green-600 text-white">
//                 Başlayın
//               </Button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { UserNav } from "./user-nav";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";

export function LandingHeader() {
  const { user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-white/95 via-slate-50/95 to-white/95 dark:from-slate-950/95 dark:via-slate-900/95 dark:to-slate-950/95 backdrop-blur-xl shadow-lg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-400/10 to-green-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10 flex h-16 items-center justify-between px-4">
        {/* Premium Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Zap className="h-5 w-5 text-white drop-shadow-sm" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            AuthFlow
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="relative group px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 font-medium"
          >
            <span className="relative z-10">Özellikler</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            href="#pricing"
            className="relative group px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 font-medium"
          >
            <span className="relative z-10">Fiyatlandırma</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            href="#contact"
            className="relative group px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 font-medium"
          >
            <span className="relative z-10">İletişim</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Authentication */}
          {user ? (
            <UserNav />
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="group relative overflow-hidden bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:to-slate-600 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-600/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="relative flex items-center gap-2">
                    <span className="font-semibold">Giriş Yap</span>
                  </div>
                </Button>
              </Link>
              <Link href="/register">
                <Button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-2">
                    <span className="font-semibold">Başlayın</span>
                  </div>
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative overflow-hidden bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:to-slate-600 border border-slate-200/50 dark:border-slate-600/50 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            ) : (
              <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-white/98 to-slate-50/98 dark:from-slate-950/98 dark:to-slate-900/98 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <div className="container px-4 py-6 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link
                href="#features"
                className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 dark:hover:from-emerald-950/20 dark:hover:to-green-950/20 rounded-xl transition-all duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Özellikler
              </Link>
              <Link
                href="#pricing"
                className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 dark:hover:from-emerald-950/20 dark:hover:to-green-950/20 rounded-xl transition-all duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fiyatlandırma
              </Link>
              <Link
                href="#contact"
                className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 dark:hover:from-emerald-950/20 dark:hover:to-green-950/20 rounded-xl transition-all duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                İletişim
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 space-y-3">
                <Link
                  href="/login"
                  className="block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:to-slate-600 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-600/50 shadow-sm hover:shadow-md transition-all duration-300 h-12"
                  >
                    <span className="font-semibold">Giriş Yap</span>
                  </Button>
                </Link>
                <Link
                  href="/register"
                  className="block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <span className="font-semibold">Başlayın</span>
                    </div>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
