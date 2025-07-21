import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <RegisterForm />
      <p className="px-8 text-center text-sm text-muted-foreground mt-4">
        Zaten bir hesabın var mı?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Giriş Yap
        </Link>
      </p>
    </div>
  );
}
