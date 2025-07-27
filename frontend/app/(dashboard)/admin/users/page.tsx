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
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Shield,
  Trash2,
  UserX,
  UserCheck,
  User,
  Users,
  Search,
  Filter,
  Crown,
  Activity,
  Calendar,
  Mail,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";
import { useAuthStore } from "@/lib/hooks/use-auth.store";

interface UserData {
  _id: string;
  name: string;
  profilePicture?: string;
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
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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
      setFilteredUsers(response.users);
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

  // Filtreleme
  useEffect(() => {
    let filtered = users;

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.surname &&
            user.surname.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Rol filtresi
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Durum filtresi
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => {
        if (statusFilter === "active") return user.isActive;
        if (statusFilter === "inactive") return !user.isActive;
        if (statusFilter === "verified") return user.isVerified;
        if (statusFilter === "unverified") return !user.isVerified;
        return true;
      });
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

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

  // İstatistikler
  const stats = {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    verified: users.filter((u) => u.isVerified).length,
    admins: users.filter((u) => u.role === "Admin").length,
    moderators: users.filter((u) => u.role === "Moderator").length,
    regularUsers: users.filter((u) => u.role === "User").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-transparent bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-spin">
            <div className="absolute inset-2 bg-white dark:bg-slate-900 rounded-full"></div>
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Ultra Premium Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm"></div>

            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-48 translate-x-48 animate-float"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/15 to-transparent rounded-full translate-y-32 -translate-x-32 animate-float-delayed"></div>
            </div>

            <div className="relative z-10 p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                      <Users className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                          Kullanıcı Yönetimi
                        </h1>
                        <div className="animate-bounce">
                          <Sparkles className="w-6 h-6 text-yellow-300 drop-shadow-lg" />
                        </div>
                      </div>
                      <p className="text-white/90 text-lg font-medium drop-shadow">
                        Sistemdeki tüm kullanıcıları görüntüleyin ve yönetin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Toplam Kullanıcı */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-slate-900/90 dark:to-blue-950/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
              <CardContent className="relative z-10 p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.total}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Toplam
                </div>
              </CardContent>
            </Card>

            {/* Aktif Kullanıcı */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-emerald-50/90 dark:from-slate-900/90 dark:to-emerald-950/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"></div>
              <CardContent className="relative z-10 p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.active}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Aktif
                </div>
              </CardContent>
            </Card>

            {/* Doğrulanmış */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-green-50/90 dark:from-slate-900/90 dark:to-green-950/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
              <CardContent className="relative z-10 p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.verified}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Doğrulanmış
                </div>
              </CardContent>
            </Card>

            {/* Admin */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-red-50/90 dark:from-slate-900/90 dark:to-red-950/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10"></div>
              <CardContent className="relative z-10 p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {stats.admins}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Admin
                </div>
              </CardContent>
            </Card>

            {/* Moderatör */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-purple-50/90 dark:from-slate-900/90 dark:to-purple-950/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/10"></div>
              <CardContent className="relative z-10 p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.moderators}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Moderatör
                </div>
              </CardContent>
            </Card>

            {/* Kullanıcı */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-gray-500/10"></div>
              <CardContent className="relative z-10 p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">
                  {stats.regularUsers}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Kullanıcı
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Premium Filters */}
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
            <CardContent className="relative z-10 p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Arama */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Kullanıcı ara (isim, email)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-gradient-to-r from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-600/50 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                  />
                </div>

                {/* Rol Filtresi */}
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full lg:w-48 h-12 bg-gradient-to-r from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-600/50">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <SelectValue placeholder="Rol Filtresi" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Roller</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Moderator">Moderatör</SelectItem>
                    <SelectItem value="User">Kullanıcı</SelectItem>
                  </SelectContent>
                </Select>

                {/* Durum Filtresi */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-48 h-12 bg-gradient-to-r from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-600/50">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <SelectValue placeholder="Durum Filtresi" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Pasif</SelectItem>
                    <SelectItem value="verified">Doğrulanmış</SelectItem>
                    <SelectItem value="unverified">Doğrulanmamış</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Premium Users Table */}
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>

            <CardHeader className="relative z-10 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Kullanıcılar ({filteredUsers.length})
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
                      Sistemde kayıtlı kullanıcıların detaylı listesi
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300"></TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                        Kullanıcı
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                        E-posta
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                        Rol
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                        Durum
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                        Kayıt Tarihi
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300">
                        İşlemler
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow
                        key={user._id}
                        className="border-slate-200/50 dark:border-slate-700/50 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-blue-50/30 dark:hover:from-slate-800/50 dark:hover:to-blue-950/20 transition-all duration-200"
                      >
                        <TableCell>
                          <div className="relative group">
                            <Avatar className="h-12 w-12 ring-2 ring-slate-200/50 dark:ring-slate-700/50 shadow-lg group-hover:scale-110 transition-all duration-200">
                              <AvatarImage
                                src={user?.profilePicture || "/placeholder.svg"}
                                className="object-cover"
                              />
                              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg">
                                {user?.name?.charAt(0)?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              {user.name} {user.surname}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              @{user.name.toLowerCase()}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <div className="space-y-1">
                              <div className="font-medium text-slate-700 dark:text-slate-300">
                                {user.email}
                              </div>
                              {user.isVerified ? (
                                <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs shadow-lg">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Doğrulanmış
                                </Badge>
                              ) : (
                                <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs shadow-lg">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Doğrulanmamış
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          {canChangeRole(user) ? (
                            <Select
                              value={user.role}
                              onValueChange={(value: "User" | "Moderator") =>
                                handleRoleChange(user._id, value)
                              }
                            >
                              <SelectTrigger className="w-36 h-10 bg-gradient-to-r from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-600/50">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="User">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>User</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="Moderator">
                                  <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    <span>Moderator</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge
                              className={`text-white shadow-lg ${
                                user.role === "Admin"
                                  ? "bg-gradient-to-r from-red-500 to-pink-600"
                                  : user.role === "Moderator"
                                  ? "bg-gradient-to-r from-purple-500 to-violet-600"
                                  : "bg-gradient-to-r from-slate-500 to-gray-600"
                              }`}
                            >
                              {user.role === "Admin" && (
                                <Crown className="w-3 h-3 mr-1" />
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
                          <Badge
                            className={`text-white shadow-lg ${
                              user.isActive
                                ? "bg-gradient-to-r from-emerald-500 to-green-600"
                                : "bg-gradient-to-r from-slate-500 to-gray-600"
                            }`}
                          >
                            {user.isActive ? (
                              <>
                                <Zap className="w-3 h-3 mr-1" />
                                Aktif
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                Pasif
                              </>
                            )}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              {new Date(user.createdAt).toLocaleDateString(
                                "tr-TR"
                              )}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-right">
                          {(canToggleStatus(user) || canDelete(user)) && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-10 w-10 p-0 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-800 dark:hover:to-slate-700 transition-all duration-200"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-gradient-to-br from-white/95 to-slate-50/95 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl"
                              >
                                <DropdownMenuLabel className="font-semibold text-slate-700 dark:text-slate-300">
                                  İşlemler
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-slate-200/50 dark:bg-slate-700/50" />

                                {/* Durum değiştir */}
                                {canToggleStatus(user) && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleToggleStatus(user._id, user.role)
                                    }
                                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/20 dark:hover:to-indigo-950/20 transition-all duration-200"
                                  >
                                    {user.isActive ? (
                                      <>
                                        <UserX className="mr-2 h-4 w-4 text-orange-500" />
                                        <span>Pasif Yap</span>
                                      </>
                                    ) : (
                                      <>
                                        <UserCheck className="mr-2 h-4 w-4 text-emerald-500" />
                                        <span>Aktif Yap</span>
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                )}

                                {/* Kullanıcı sil */}
                                {canDelete(user) && (
                                  <>
                                    <DropdownMenuSeparator className="bg-slate-200/50 dark:bg-slate-700/50" />
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleDeleteUser(user._id, user.role)
                                      }
                                      className="text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/20 dark:hover:to-pink-950/20 transition-all duration-200"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Sil</span>
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
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Kullanıcı bulunamadı
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Arama kriterlerinize uygun kullanıcı bulunmuyor.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
