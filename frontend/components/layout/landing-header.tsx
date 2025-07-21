import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Proje Adı</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#features"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Özellikler
            </Link>
            <Link
              href="#pricing"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Fiyatlandırma
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Link
              href="/login"
              className={buttonVariants({ variant: "secondary" })}
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className={buttonVariants({ variant: "default" })}
            >
              Hemen Başla
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
