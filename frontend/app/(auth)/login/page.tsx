import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <LoginForm />
      <p className="px-8 text-center text-sm text-muted-foreground mt-4">
        Henüz bir hesabın yok mu?{" "}
        <Link
          href="/register"
          className="underline underline-offset-4 hover:text-primary"
        >
          Kayıt Ol
        </Link>
      </p>
    </div>
  );
}
