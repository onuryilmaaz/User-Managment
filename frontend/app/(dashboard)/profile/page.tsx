"use client";

import { ProfileEditDialog } from "@/components/profile/profile-edit-dialog";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">
            @{user.username || user.email.split("@")[0]}
          </p>
        </div>
        {/* İşte Dialog'u buraya koyuyoruz. O zaten kendi içinde bir buton. */}
        <ProfileEditDialog />
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Hakkında</CardTitle>
          <CardDescription>
            Kullanıcı biyografisi ve temel bilgiler.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {user.bio || "Henüz bir biyografi eklenmemiş."}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>İletişim Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold">E-posta: </span>
            <span className="text-muted-foreground">{user.email}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Telefon: </span>
            <span className="text-muted-foreground">{user.phone || "-"}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
