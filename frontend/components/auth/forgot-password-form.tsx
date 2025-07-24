"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";
import { forgotPassword } from "@/lib/services/auth.service";
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
import { ResetPasswordWithCodeForm } from "./reset-password-with-code-form";

const forgotPasswordSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [email, setEmail] = useState("");

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setIsLoading(true);
    try {
      await forgotPassword(data);
      toast.success(
        "Şifre sıfırlama kodu e-posta adresinize gönderildi."
      );
      setEmail(data.email);
      setIsCodeSent(true);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "E-posta gönderme hatası";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  if (isCodeSent) {
    return <ResetPasswordWithCodeForm email={email} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Şifremi Unuttum</h2>
        <p className="text-muted-foreground">
          E-posta adresinizi girin, size şifre sıfırlama kodu gönderelim.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E-posta adresinizi girin"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Gönderiliyor..." : "Şifre Sıfırlama Kodu Gönder"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
