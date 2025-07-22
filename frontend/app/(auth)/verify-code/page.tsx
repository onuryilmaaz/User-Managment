"use client";

import { VerifyCodeForm } from "../../../components/auth/verify-code-form";
import Link from "next/link";
import { Suspense } from "react";

export default function VerifyCodePage() {
  return (
    <div className="w-full max-w-md">
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <VerifyCodeForm />
      </Suspense>
      <p className="px-8 text-center text-sm text-muted-foreground mt-4">
        Kod gelmedi mi?{" "}
        <button className="underline underline-offset-4 hover:text-primary">
          Tekrar gönder
        </button>
      </p>
      <p className="px-8 text-center text-sm text-muted-foreground mt-2">
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Giriş sayfasına dön
        </Link>
      </p>
    </div>
  );
}
