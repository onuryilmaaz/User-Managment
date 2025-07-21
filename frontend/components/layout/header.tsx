import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between px-6 border-b bg-background">
      <div className="flex items-center gap-4">
        {/* Arama Çubuğu */}
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {/* Kullanıcı Menüsü */}
        <UserNav />
      </div>
    </header>
  );
}
