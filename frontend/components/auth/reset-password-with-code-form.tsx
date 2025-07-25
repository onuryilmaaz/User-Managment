"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ResetPasswordWithCodeSchema } from "@/lib/validators/auth.schema";
import { resetPasswordWithCode } from "@/lib/services/auth.service";
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
import { PasswordInput } from "@/components/ui/password-input";
import { useCountdown } from "@/lib/hooks/use-countdown";
import { CountdownTimer } from "@/components/ui/countdown-timer";

type ResetPasswordWithCodeFormData = z.infer<
  typeof ResetPasswordWithCodeSchema
>;

interface ResetPasswordWithCodeFormProps {
  email: string;
}

export function ResetPasswordWithCodeForm({
  email,
}: ResetPasswordWithCodeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<ResetPasswordWithCodeFormData>({
    resolver: zodResolver(ResetPasswordWithCodeSchema),
    defaultValues: {
      email,
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const newDigits = [...codeDigits];
    newDigits[index] = digit;
    setCodeDigits(newDigits);

    const fullCode = newDigits.join("");
    form.setValue("code", fullCode);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
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
      inputRefs.current[5]?.focus();
    }
  };

  // Countdown hook ekle
  const { timeLeft, formattedTime, isExpired, startCountdown } =
    useCountdown(10);

  useEffect(() => {
    if (!email) {
      toast.error("E-posta adresi bulunamadı.");
      router.push("/forgot-password");
    } else {
      // Sayfa yüklendiğinde countdown'u başlat
      startCountdown();
    }
  }, [email, router, startCountdown]);

  // onSubmit fonksiyonunda expired kontrolü ekle
  async function onSubmit(data: ResetPasswordWithCodeFormData) {
    if (!email) return;

    if (isExpired) {
      toast.error("Doğrulama kodu süresi dolmuş. Lütfen yeni kod isteyin.");
      return;
    }
    setIsLoading(true);
    try {
      await resetPasswordWithCode({
        email,
        code: data.code,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      toast.success("Şifreniz başarıyla güncellendi. Giriş yapabilirsiniz.");
      router.push("/login");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Şifre güncelleme hatası";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Şifre Sıfırlama</h2>
        <p className="text-muted-foreground">
          {email} adresine gönderilen kodu girin ve yeni şifrenizi belirleyin.
        </p>
        {/* Countdown Timer */}
        <CountdownTimer
          timeLeft={timeLeft}
          formattedTime={formattedTime}
          isExpired={isExpired}
          className="justify-center"
        />
      </div>

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
                        onChange={(e) =>
                          handleDigitChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-green-500 transition-colors bg-white dark:bg-black border-gray-200 dark:border-gray-800"
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yeni Şifre</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Yeni şifrenizi girin"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şifre Onayı</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Şifrenizi tekrar girin"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || codeDigits.join("").length !== 6}
          >
            {isLoading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
