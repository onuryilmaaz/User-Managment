import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <ForgotPasswordForm />
      <p className="px-8 text-center text-sm text-muted-foreground mt-4">
        Şifrenizi hatırladınız mı?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Giriş yapın
        </Link>
      </p>
    </div>
  );
}
