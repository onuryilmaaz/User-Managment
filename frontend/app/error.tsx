"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <CardTitle className="text-2xl text-red-600">Bir Hata Oluştu</CardTitle>
          <CardDescription>
            Beklenmeyen bir hata meydana geldi. Lütfen tekrar deneyin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 font-mono">
                {error.message}
              </p>
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <Button onClick={reset}>Tekrar Dene</Button>
            <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
              Ana Sayfaya Dön
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}