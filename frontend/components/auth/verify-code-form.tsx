"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import {
  verifyCode,
  resendVerificationCode,
} from "@/lib/services/auth.service";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { useCountdown } from "@/lib/hooks/use-countdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountdownTimer } from "@/components/ui/countdown-timer";
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
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { refreshAuth } = useAuthStore();

  // Countdown hook ekle
  const { timeLeft, formattedTime, isExpired, startCountdown } =
    useCountdown(10);

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
    } else {
      // Sayfa yüklendiğinde countdown'u başlat
      startCountdown();
    }
  }, [email, router, startCountdown]);

  useEffect(() => {
    // İlk input'a odaklan
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    // Sadece rakam kabul et
    const digit = value.replace(/\D/g, "").slice(-1);

    const newDigits = [...codeDigits];
    newDigits[index] = digit;
    setCodeDigits(newDigits);

    // Form değerini güncelle
    const fullCode = newDigits.join("");
    form.setValue("code", fullCode);

    // Eğer rakam girildiyse ve son kutucuk değilse, bir sonraki kutucuğa geç
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Backspace ile önceki kutucuğa geç
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Enter ile form gönder
    if (e.key === "Enter" && codeDigits.join("").length === 6) {
      form.handleSubmit(onSubmit)();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pastedData.length === 6) {
      const newDigits = pastedData.split("");
      setCodeDigits(newDigits);
      form.setValue("code", pastedData);

      // Son kutucuğa odaklan
      inputRefs.current[5]?.focus();
    }
  };

  async function onSubmit(data: VerifyCodeFormData) {
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await verifyCode({ email, code: data.code });
      
      // Backend'den gelen user ve token bilgilerini store'a kaydet
      if (response.user && response.tokens) {
        refreshAuth(response.user, response.tokens.accessToken);
        toast.success("E-posta adresiniz başarıyla doğrulandı! Giriş yapılıyor...");
        router.push("/dashboard");
      } else {
        toast.success("E-posta adresiniz başarıyla doğrulandı.");
        router.push("/login");
      }
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
      // Kodu temizle ve ilk kutucuğa odaklan
      setCodeDigits(["", "", "", "", "", ""]);
      form.setValue("code", "");
      inputRefs.current[0]?.focus();
      // Countdown'u yeniden başlat
      startCountdown();
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

      {/* Countdown Timer Ekle */}
      <CountdownTimer
        timeLeft={timeLeft}
        formattedTime={formattedTime}
        isExpired={isExpired}
        className="justify-center"
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={() => (
              <FormItem>
                <FormLabel className="text-center block">
                  Doğrulama Kodu
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center gap-3">
                    {codeDigits.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-green-500 transition-colors"
                        disabled={isLoading || isExpired}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
                {isExpired && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    Doğrulama kodu süresi doldu. Lütfen yeni kod isteyin.
                  </p>
                )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || codeDigits.join("").length !== 6 || isExpired}
          >
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
