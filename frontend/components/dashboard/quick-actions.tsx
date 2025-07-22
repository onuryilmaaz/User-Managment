"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings, Shield, Bell } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hızlı İşlemler</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Link href="/profile">
          <Button variant="outline" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Profili Düzenle
          </Button>
        </Link>
        
        <Link href="/settings">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Ayarlar
          </Button>
        </Link>
        
        <Link href="/settings/security">
          <Button variant="outline" className="w-full justify-start">
            <Shield className="mr-2 h-4 w-4" />
            Güvenlik
          </Button>
        </Link>
        
        <Link href="/settings/notifications">
          <Button variant="outline" className="w-full justify-start">
            <Bell className="mr-2 h-4 w-4" />
            Bildirimler
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}