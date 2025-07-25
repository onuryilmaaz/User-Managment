import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";
import { Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-black/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-black/80">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Sol Taraf - Logo ve Arama */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Premium Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-green-500 flex items-center justify-center shadow-lg">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <span className="font-bold text-lg text-green-500">
                AuthFlow
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Dashboard
              </div>
            </div>
          </div>

          {/* Arama Çubuğu */}
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>

        {/* Sağ Taraf - Aksiyonlar */}
        <div className="flex items-center gap-3">
          {/* Tema Değiştirici */}
          <ThemeToggle />

          {/* Kullanıcı Menüsü */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
