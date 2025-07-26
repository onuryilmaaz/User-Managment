import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100/60 dark:border-gray-800/40 bg-white/98 dark:bg-black/98 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Sol Taraf - Logo ve Arama */}
        <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
          {/* Arama Çubuğu */}
          <div className="hidden sm:block w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <SearchBar />
          </div>
        </div>

        {/* Sağ Taraf - Aksiyonlar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Tema Değiştirici */}
          <ThemeToggle />

          {/* Kullanıcı Menüsü */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
