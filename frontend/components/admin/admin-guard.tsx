"use client";

import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isRoleChecked, setIsRoleChecked] = useState(false);

  useEffect(() => {
    if (user) {
      const isAuthorized = user.role === "Admin" || user.role === "Moderator";
      if (!isAuthorized) {
        // Yetkisi yoksa ana dashboard'a yönlendir
        router.push("/dashboard");
      } else {
        setIsRoleChecked(true);
      }
    }
  }, [user, router]);

  if (!isRoleChecked) {
    return (
      <div className="flex items-center justify-center h-full">
        Yetki kontrol ediliyor...
      </div>
    );
  }

  return <>{children}</>;
}
