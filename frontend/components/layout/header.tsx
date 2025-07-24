import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";
import { Bell, Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Sol Taraf - Logo ve Arama */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Modern Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
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
          {/* Bildirimler */}
          <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 dark:hover:bg-blue-950/20">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center animate-pulse"
            >
              3
            </Badge>
          </Button>
          
          {/* Tema Değiştirici */}
          <ThemeToggle />
          
          {/* Kullanıcı Menüsü */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
