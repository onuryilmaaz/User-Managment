import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Hero Section - Mavi Tema */}
      <div className="text-center space-y-3">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center mb-4 shadow-lg">
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
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-900 to-green-600 dark:from-blue-100 dark:to-blue-300 bg-clip-text text-transparent">
          Tekrar Hoş Geldin
        </h1>
        <p className="text-sm text-green-600 dark:text-green-400">
          Hesabına giriş yaparak devam et
        </p>
      </div>

      {/* Main Form */}
      <div className="space-y-4">
        <LoginForm />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-green-200 dark:border-green-700" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-3 text-green-600 dark:text-green-400 font-medium">
              veya
            </span>
          </div>
        </div>

        {/* Google Auth */}
        <GoogleAuthButton mode="login" />
      </div>

      {/* Footer Links - Mavi Tema */}
      <div className="space-y-3 text-center">
        <div className="flex flex-col gap-2 text-sm">
          <Link
            href="/register"
            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 transition-colors duration-200"
          >
            Hesabın yok mu?{" "}
            <span className="text-green-800 dark:text-green-300 font-semibold">
              Kayıt ol
            </span>
          </Link>
          <Link
            href="/forgot-password"
            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 transition-colors duration-200"
          >
            Şifreni mi unuttun?
          </Link>
        </div>
      </div>
    </div>
  );
}
