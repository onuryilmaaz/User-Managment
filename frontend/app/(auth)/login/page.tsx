import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Hero Section - Kompakt */}
      <div className="text-center space-y-3">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Tekrar Hoş Geldin
        </h1>
        <p className="text-sm text-muted-foreground">
          Hesabına giriş yaparak devam et
        </p>
      </div>

      {/* Main Form */}
      <div className="space-y-4">
        <LoginForm />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-3 text-muted-foreground font-medium">
              veya
            </span>
          </div>
        </div>

        {/* Google Auth */}
        <GoogleAuthButton mode="login" />
      </div>

      {/* Footer Links - Kompakt */}
      <div className="space-y-3 text-center">
        <div className="flex flex-col gap-2 text-sm">
          <Link
            href="/register"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Hesabın yok mu?{" "}
            <span className="text-primary font-semibold">Kayıt ol</span>
          </Link>
          <Link
            href="/forgot-password"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Şifreni mi unuttun?
          </Link>
        </div>
      </div>
    </div>
  );
}
