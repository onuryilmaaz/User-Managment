import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Hero Section - Yeşil Tema */}
      <div className="text-center space-y-3">
        <div className="mx-auto w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Hesabını Oluştur
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hızlıca hesabını oluştur ve başla
        </p>
      </div>

      {/* Main Form */}
      <div className="space-y-4">
        <RegisterForm />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white dark:bg-black px-3 text-gray-600 dark:text-gray-400 font-medium">
              veya
            </span>
          </div>
        </div>

        {/* Google Auth */}
        <GoogleAuthButton mode="register" />
      </div>

      {/* Footer Links - Yeşil Tema */}
      <div className="text-center">
        <div className="text-sm">
          <span className="text-gray-600 dark:text-gray-400">Zaten hesabın var mı? </span>
          <Link
            href="/login"
            className="text-green-500 font-semibold hover:text-green-600 transition-all duration-200"
          >
            Giriş yap
          </Link>
        </div>
      </div>
    </div>
  );
}
