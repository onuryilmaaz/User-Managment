"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

import {
  UserLoginSchema,
  UserLoginPayload,
} from "@/lib/validators/auth.schema";
import { loginUser } from "@/lib/services/auth.service";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "../ui/password-input";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setToken } = useAuthStore();

  const form = useForm<UserLoginPayload>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: UserLoginPayload) {
    setIsLoading(true);
    try {
      const response = await loginUser(values);
      toast.success(response.message);

      setUser(response.user);
      setToken(response.tokens.accessToken);

      router.push("/dashboard");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Giriş sırasında bir hata oluştu";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-green-100 dark:border-green-800">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-green-700 dark:text-green-300">
                    E-posta
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ornek@email.com"
                      className="h-10 border-green-200 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400 transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-green-700 dark:text-green-300">
                    Şifre
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="••••••••"
                      className="h-10 border-green-200 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400 transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-10 bg-gradient-to-r from-green-600 to-emerald-800 hover:from-green-700 hover:to-emerald-900 text-white font-medium rounded-md transition-all duration-200 shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Giriş yapılıyor...
                </div>
              ) : (
                "Giriş Yap"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
