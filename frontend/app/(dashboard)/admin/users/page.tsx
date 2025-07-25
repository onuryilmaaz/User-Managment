"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getUserList,
  deleteUser,
  toggleUserStatus,
  changeUserRole,
} from "@/lib/services/user.service";
import { toast } from "sonner";
import Swal from "sweetalert2";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreHorizontal,
  Shield,
  ShieldCheck,
  Trash2,
  UserX,
  UserCheck,
  User,
} from "lucide-react";
import { useAuthStore } from "@/lib/hooks/use-auth.store";

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
  const handleDeleteUser = async (userId: string, userRole: string) => {
    // Moderatör admin silemez
    if (currentUser?.role === "Moderator" && userRole === "Admin") {
      toast.error("Moderatörler admin kullanıcıları silemez!");
      return;
    }

    // SweetAlert ile onay al
    const result = await Swal.fire({
      title: "Kullanıcıyı Sil",
      text: "Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Evet, Sil!",
      cancelButtonText: "İptal",
      background: "var(--background)",
      color: "var(--foreground)",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteUser(userId);

      // Başarı mesajı
      await Swal.fire({
        title: "Silindi!",
        text: "Kullanıcı başarıyla silindi.",
        icon: "success",
        confirmButtonColor: "#22c55e",
        background: "var(--background)",
        color: "var(--foreground)",
      });

      loadUsers();
    } catch (error) {
      // Hata mesajı
      await Swal.fire({
        title: "Hata!",
        text:
          error instanceof Error
            ? error.message
            : "Kullanıcı silinirken hata oluştu",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "var(--background)",
        color: "var(--foreground)",
      });
    }
  };

  // Kullanıcı durumunu değiştir
  const handleToggleStatus = async (userId: string, userRole: string) => {
    // Moderatör admin'i pasif yapamaz
    if (currentUser?.role === "Moderator" && userRole === "Admin") {
      toast.error("Moderatörler admin kullanıcılarının durumunu değiştiremez!");
      return;
    }

    // Kullanıcının mevcut durumunu bul
    const user = users.find((u) => u._id === userId);
    const newStatus = user?.isActive ? "pasif" : "aktif";

    // SweetAlert ile onay al
    const result = await Swal.fire({
      title: `Kullanıcıyı ${
        newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
      } Yap`,
      text: `Bu kullanıcıyı ${newStatus} yapmak istediğinizden emin misiniz?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus === "aktif" ? "#22c55e" : "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Evet, ${
        newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
      } Yap!`,
      cancelButtonText: "İptal",
      background: "var(--background)",
      color: "var(--foreground)",
    });

    if (!result.isConfirmed) return;

    try {
      await toggleUserStatus(userId);

      // Başarı mesajı
      await Swal.fire({
        title: "Güncellendi!",
        text: `Kullanıcı durumu ${newStatus} olarak güncellendi.`,
        icon: "success",
        confirmButtonColor: "#22c55e",
        background: "var(--background)",
        color: "var(--foreground)",
      });

      loadUsers();
    } catch (error) {
      // Hata mesajı
      await Swal.fire({
        title: "Hata!",
        text:
          error instanceof Error
            ? error.message
            : "Durum değiştirilirken hata oluştu",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "var(--background)",
        color: "var(--foreground)",
      });
    }
  };

  // Rol değiştir
  const handleRoleChange = async (
    userId: string,
    newRole: "User" | "Moderator"
  ) => {
    // Sadece adminler rol değiştirebilir
    if (currentUser?.role !== "Admin") {
      toast.error("Sadece adminler rol değiştirebilir!");
      return;
    }

    try {
      await changeUserRole(userId, newRole);
      toast.success("Kullanıcı rolü başarıyla güncellendi");
      loadUsers();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Rol değiştirilirken hata oluştu"
      );
    }
  };

  // Helper function to get current user ID
  const getCurrentUserId = () => {
    if (!currentUser) return null;
    return currentUser._id;
  };

  // Rol değiştirme yetkisi kontrolü
  const canChangeRole = (targetUser: UserData) => {
    // Sadece adminler rol değiştirebilir
    if (currentUser?.role !== "Admin") return false;
    // Admin kendisinin rolünü değiştiremez
    if (targetUser._id === getCurrentUserId()) return false;
    // Admin rolündeki kullanıcıların rolü değiştirilemez
    if (targetUser.role === "Admin") return false;
    return true;
  };

  // Silme yetkisi kontrolü
  const canDelete = (targetUser: UserData) => {
    // Kendi hesabını silemez
    if (targetUser._id === getCurrentUserId()) return false;
    // Moderatör admin silemez
    if (currentUser?.role === "Moderator" && targetUser.role === "Admin")
      return false;
    // Admin olmayan kullanıcılar admin silemez
    if (currentUser?.role !== "Admin" && targetUser.role === "Admin")
      return false;
    return true;
  };

  // Durum değiştirme yetkisi kontrolü
  const canToggleStatus = (targetUser: UserData) => {
    // Kendi durumunu değiştiremez
    if (targetUser._id === getCurrentUserId()) return false;
    // Moderatör admin'in durumunu değiştiremez
    if (currentUser?.role === "Moderator" && targetUser.role === "Admin")
      return false;
    return true;
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
                    {canChangeRole(user) ? (
                      <Select
                        value={user.role}
                        onValueChange={(value: "User" | "Moderator") =>
                          handleRoleChange(user._id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="User">
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              User
                            </div>
                          </SelectItem>
                          <SelectItem value="Moderator">
                            <div className="flex items-center">
                              <Shield className="w-3 h-3 mr-1" />
                              Moderator
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
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
                        {user.role === "User" && (
                          <User className="w-3 h-3 mr-1" />
                        )}
                        {user.role}
                      </Badge>
                    )}
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
                    {canToggleStatus(user) && (
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
                            onClick={() =>
                              handleToggleStatus(user._id, user.role)
                            }
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
                          {canDelete(user) && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteUser(user._id, user.role)
                                }
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Sil
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
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
