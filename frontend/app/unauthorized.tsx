"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <CardTitle className="text-2xl text-orange-600">Yetkisiz Erişim</CardTitle>
          <CardDescription>
            Bu sayfaya erişim yetkiniz bulunmamaktadır.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Button asChild>
              <Link href="/dashboard">Ana Sayfaya Dön</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Giriş Yap</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}