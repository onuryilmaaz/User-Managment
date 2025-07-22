"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import {
  verifyCode,
  resendVerificationCode,
} from "@/lib/services/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const verifyCodeSchema = z.object({
  code: z.string().length(6, "Doğrulama kodu 6 haneli olmalıdır"),
});

type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;

export function VerifyCodeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    if (!email) {
      toast.error("E-posta adresi bulunamadı.");
      router.push("/register");
    }
  }, [email, router]);

  async function onSubmit(data: VerifyCodeFormData) {
    if (!email) return;

    setIsLoading(true);
    try {
      await verifyCode({ email, code: data.code });
      toast.success("E-posta adresiniz başarıyla doğrulandı.");
      router.push("/login");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Doğrulama hatası";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendCode() {
    if (!email) return;

    setIsResending(true);
    try {
      await resendVerificationCode({ email });
      toast.success("Doğrulama kodu tekrar gönderildi.");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Kod gönderme hatası";
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">E-posta Doğrulama</h2>
        <p className="text-muted-foreground">
          {email} adresine gönderilen 6 haneli kodu girin.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doğrulama Kodu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="6 haneli kodu girin"
                    maxLength={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Doğrulanıyor..." : "Doğrula"}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Button
          variant="link"
          onClick={handleResendCode}
          disabled={isResending}
        >
          {isResending ? "Gönderiliyor..." : "Kodu Tekrar Gönder"}
        </Button>
      </div>
    </div>
  );
}
