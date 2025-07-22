"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/hooks/use-auth.store";
import {
  getUserList,
  deleteUser,
  toggleUserStatus,
} from "@/lib/services/user.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Shield,
  ShieldCheck,
  Trash2,
  UserX,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserData {
  _id: string;
  name: string;
  surname?: string;
  email: string;
  role: "User" | "Moderator" | "Admin";
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

// Extended User type for current user with _id field
interface CurrentUser {
  id: string;
  _id?: string; // Add _id for compatibility
  name: string;
  surname?: string;
  username?: string;
  email: string;
  role: "User" | "Moderator" | "Admin";
  isVerified: boolean;
  isActive: boolean;
  profilePicture?: string;
  bio?: string;
  phone?: string;
  location?: {
    country?: string;
    city?: string;
  };
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAuthStore();
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  // Yetki kontrolü
  useEffect(() => {
    if (
      !currentUser ||
      (currentUser.role !== "Admin" && currentUser.role !== "Moderator")
    ) {
      router.push("/dashboard");
      return;
    }
  }, [currentUser, router]);

  // Kullanıcıları yükle
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await getUserList();
      setUsers(response.users);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Kullanıcılar yüklenirken hata oluştu"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Kullanıcı sil
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) return;

    try {
      await deleteUser(userId);
      toast.success("Kullanıcı başarıyla silindi");
      loadUsers();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Kullanıcı silinirken hata oluştu"
      );
    }
  };

  // Kullanıcı durumunu değiştir
  const handleToggleStatus = async (userId: string) => {
    try {
      await toggleUserStatus(userId);
      toast.success("Kullanıcı durumu güncellendi");
      loadUsers();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Durum değiştirilirken hata oluştu"
      );
    }
  };

  // Helper function to get current user ID (handles both id and _id)
  const getCurrentUserId = () => {
    if (!currentUser) return null;
    return (currentUser as CurrentUser)._id || currentUser.id;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Yükleniyor...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Kullanıcı Yönetimi
        </h1>
        <p className="text-muted-foreground">
          Sistemdeki tüm kullanıcıları görüntüleyin ve yönetin.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kullanıcılar ({users.length})</CardTitle>
          <CardDescription>
            Sistemde kayıtlı tüm kullanıcıların listesi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kullanıcı</TableHead>
                <TableHead>E-posta</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Kayıt Tarihi</TableHead>
                <TableHead>Son Giriş</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {user.name} {user.surname}
                      </div>
                      {user.isVerified ? (
                        <Badge variant="secondary" className="text-xs">
                          Doğrulanmış
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">
                          Doğrulanmamış
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "Admin"
                          ? "destructive"
                          : user.role === "Moderator"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {user.role === "Admin" && (
                        <ShieldCheck className="w-3 h-3 mr-1" />
                      )}
                      {user.role === "Moderator" && (
                        <Shield className="w-3 h-3 mr-1" />
                      )}
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "default" : "secondary"}>
                      {user.isActive ? "Aktif" : "Pasif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                  </TableCell>
                  <TableCell>
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleDateString("tr-TR")
                      : "Hiç giriş yapmamış"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {/* Durum değiştir */}
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(user._id)}
                          disabled={user._id === getCurrentUserId()}
                        >
                          {user.isActive ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Pasif Yap
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Aktif Yap
                            </>
                          )}
                        </DropdownMenuItem>

                        {/* Kullanıcı sil */}
                        {(currentUser?.role === "Admin" ||
                          currentUser?.role === "Moderator") &&
                          user.role !== "Admin" &&
                          user._id !== getCurrentUserId() && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteUser(user._id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Sil
                              </DropdownMenuItem>
                            </>
                          )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
