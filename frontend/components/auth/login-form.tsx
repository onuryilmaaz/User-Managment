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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  // async function onSubmit(values: UserLoginPayload) {
  //   setIsLoading(true);
  //   // Eğer burada localStorage.setItem ile ilgili bir satır varsa SİL.

  //   try {
  //     const response = await loginUser(values);
  //     toast.success(response.message);

  //     // DOĞRU YÖNTEM: Token'ı ve kullanıcıyı sadece store üzerinden set et.
  //     // Persist middleware kalanı halledecektir.
  //     setUser(response.user);
  //     setToken(response.tokens.accessToken);

  //     router.push("/dashboard");
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  async function onSubmit(values: UserLoginPayload) {
    setIsLoading(true);
    try {
      const response = await loginUser(values);
      toast.success(response.message);

      setUser(response.user);
      setToken(response.tokens.accessToken);

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Giriş Yap</CardTitle>
        <CardDescription>
          Hesabınıza erişmek için bilgilerinizi girin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-posta</FormLabel>
                  <FormControl>
                    <Input placeholder="ahmet@example.com" {...field} />
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
                  <FormLabel>Şifre</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
