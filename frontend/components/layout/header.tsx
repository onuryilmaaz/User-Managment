import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Sol Taraf - Logo ve Arama */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="hidden md:block font-semibold text-lg">Admin Panel</span>
          </div>
          
          {/* Arama Çubuğu */}
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>

        {/* Sağ Taraf - Aksiyonlar */}
        <div className="flex items-center gap-3">
          {/* Bildirimler */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
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
