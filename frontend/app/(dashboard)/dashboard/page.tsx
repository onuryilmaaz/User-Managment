// "use client";

// import { useAuthStore } from "@/lib/hooks/use-auth.store";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import Link from "next/link";
// import {
//   Users,
//   UserCheck,
//   Settings,
//   Shield,
//   ShieldCheck,
//   User,
//   TrendingUp,
//   Clock,
//   BarChart3,
//   Activity,
//   Zap,
//   Star,
//   Calendar,
//   Bell,
//   Sparkles,
//   Crown,
//   Target,
//   Award,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import { getUserList } from "@/lib/services/user.service";

// // User interface tanımı
// interface UserData {
//   _id: string;
//   name: string;
//   surname?: string;
//   email: string;
//   role: "User" | "Moderator" | "Admin";
//   isActive: boolean;
//   isVerified: boolean;
//   createdAt: string;
//   lastLogin?: string;
// }

// export default function DashboardPage() {
//   const { user } = useAuthStore();
//   const [userStats, setUserStats] = useState({
//     total: 0,
//     active: 0,
//     verified: 0,
//   });

//   const isAdminOrModerator =
//     user?.role === "Admin" || user?.role === "Moderator";

//   // Admin/Moderatör için kullanıcı istatistiklerini yükle
//   useEffect(() => {
//     if (isAdminOrModerator) {
//       const loadUserStats = async () => {
//         try {
//           const response = await getUserList();
//           const users: UserData[] = response.users;
//           setUserStats({
//             total: users.length,
//             active: users.filter((u: UserData) => u.isActive).length,
//             verified: users.filter((u: UserData) => u.isVerified).length,
//           });
//         } catch (error) {
//           console.error("İstatistikler yüklenirken hata:", error);
//         }
//       };
//       loadUserStats();
//     }
//   }, [isAdminOrModerator]);

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-gradient-to-r from-blue-500 to-purple-600 border-t-transparent"></div>
//           <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse"></div>
//         </div>
//       </div>
//     );
//   }

//   const currentHour = new Date().getHours();
//   const greeting =
//     currentHour < 12
//       ? "Günaydın"
//       : currentHour < 18
//       ? "İyi günler"
//       : "İyi akşamlar";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Premium Header */}
//         <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl">
//           <div className="absolute inset-0 bg-black/10"></div>
//           <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

//           <div className="relative z-10 flex items-center justify-between">
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
//                   <span className="text-white font-bold text-2xl">
//                     {user.name.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <div>
//                   <h1 className="text-3xl font-bold text-white">
//                     {greeting}, {user.name}!
//                     <Sparkles className="inline-block w-8 h-8 ml-2 text-yellow-300" />
//                   </h1>
//                   <p className="text-white/80 text-lg">
//                     {new Date().toLocaleDateString("tr-TR", {
//                       weekday: "long",
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
//                   <Crown className="w-4 h-4 mr-2" />
//                   {user.role}
//                 </Badge>
//                 {user.isVerified && (
//                   <Badge className="bg-green-500/20 text-green-100 border-green-400/30 backdrop-blur-sm px-4 py-2">
//                     <ShieldCheck className="w-4 h-4 mr-2" />
//                     Doğrulanmış
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             <div className="hidden lg:block">
//               <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
//                 <Activity className="w-16 h-16 text-white/80" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Premium Stats Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           {/* Hesap Durumu */}
//           <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-emerald-50/50 dark:from-slate-900 dark:to-emerald-950/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
//             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5"></div>
//             <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">
//                 Hesap Durumu
//               </CardTitle>
//               <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
//                 <UserCheck className="h-5 w-5 text-white" />
//               </div>
//             </CardHeader>
//             <CardContent className="relative z-10">
//               <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
//                 {user.isVerified ? "Aktif" : "Beklemede"}
//               </div>
//               <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
//                 {user.isVerified
//                   ? "Tüm özellikler kullanılabilir"
//                   : "E-posta doğrulaması gerekli"}
//               </p>
//               <Progress value={user.isVerified ? 100 : 50} className="mt-3" />
//             </CardContent>
//           </Card>

//           {/* Yetki Seviyesi */}
//           <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-900 dark:to-blue-950/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
//             <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">
//                 Yetki Seviyesi
//               </CardTitle>
//               <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
//                 {user.role === "Admin" ? (
//                   <Crown className="h-5 w-5 text-white" />
//                 ) : user.role === "Moderator" ? (
//                   <Shield className="h-5 w-5 text-white" />
//                 ) : (
//                   <User className="h-5 w-5 text-white" />
//                 )}
//               </div>
//             </CardHeader>
//             <CardContent className="relative z-10">
//               <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 {user.role}
//               </div>
//               <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
//                 {user.role === "Admin"
//                   ? "Tam sistem kontrolü"
//                   : user.role === "Moderator"
//                   ? "Kullanıcı yönetimi yetkisi"
//                   : "Standart kullanıcı erişimi"}
//               </p>
//               <div className="flex items-center mt-3">
//                 <Star className="w-4 h-4 text-yellow-500 mr-1" />
//                 <span className="text-sm font-medium">
//                   {user.role === "Admin"
//                     ? "Maksimum"
//                     : user.role === "Moderator"
//                     ? "Yüksek"
//                     : "Standart"}
//                 </span>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Admin/Moderatör İstatistikleri */}
//           {isAdminOrModerator && (
//             <>
//               <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-900 dark:to-purple-950/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
//                 <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">
//                     Toplam Kullanıcı
//                   </CardTitle>
//                   <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <Users className="h-5 w-5 text-white" />
//                   </div>
//                 </CardHeader>
//                 <CardContent className="relative z-10">
//                   <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                     {userStats.total}
//                   </div>
//                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
//                     Kayıtlı kullanıcı sayısı
//                   </p>
//                   <div className="flex items-center mt-3">
//                     <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//                     <span className="text-sm font-medium text-green-600">
//                       +12% bu ay
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-orange-50/50 dark:from-slate-900 dark:to-orange-950/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
//                 <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5"></div>
//                 <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">
//                     Aktif Kullanıcı
//                   </CardTitle>
//                   <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <Zap className="h-5 w-5 text-white" />
//                   </div>
//                 </CardHeader>
//                 <CardContent className="relative z-10">
//                   <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//                     {userStats.active}
//                   </div>
//                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
//                     Son 30 gün içinde aktif
//                   </p>
//                   <Progress
//                     value={(userStats.active / userStats.total) * 100}
//                     className="mt-3"
//                   />
//                 </CardContent>
//               </Card>
//             </>
//           )}

//           {/* Normal kullanıcılar için aktivite */}
//           {!isAdminOrModerator && (
//             <>
//               <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-violet-50/50 dark:from-slate-900 dark:to-violet-950/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
//                 <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5"></div>
//                 <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">
//                     Son Aktivite
//                   </CardTitle>
//                   <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <Clock className="h-5 w-5 text-white" />
//                   </div>
//                 </CardHeader>
//                 <CardContent className="relative z-10">
//                   <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
//                     Bugün
//                   </div>
//                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
//                     Dashboarda giriş yaptınız
//                   </p>
//                   <div className="flex items-center mt-3">
//                     <Calendar className="w-4 h-4 text-blue-500 mr-1" />
//                     <span className="text-sm font-medium">
//                       {new Date().toLocaleDateString("tr-TR")}
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-teal-50/50 dark:from-slate-900 dark:to-teal-950/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
//                 <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5"></div>
//                 <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">
//                     Başarılar
//                   </CardTitle>
//                   <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <Award className="h-5 w-5 text-white" />
//                   </div>
//                 </CardHeader>
//                 <CardContent className="relative z-10">
//                   <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
//                     3/5
//                   </div>
//                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
//                     Profil tamamlama oranı
//                   </p>
//                   <Progress value={60} className="mt-3" />
//                 </CardContent>
//               </Card>
//             </>
//           )}
//         </div>

//         {/* Premium Action Cards */}
//         {/* Action Cards - Sade Tasarım */}
//         <div className="grid gap-6 lg:grid-cols-2">
//           {/* Hesap İşlemleri */}
//           <Card className="border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-200">
//             <CardHeader className="pb-4">
//               <CardTitle className="flex items-center gap-3 text-lg font-semibold">
//                 <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
//                   <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//                 </div>
//                 Hesap İşlemleri
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <Link href="/profile">
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start h-12 text-left"
//                 >
//                   <User className="mr-3 h-4 w-4" />
//                   <div>
//                     <div className="font-medium">Profili Düzenle</div>
//                     <div className="text-xs text-muted-foreground">
//                       Kişisel bilgilerinizi güncelleyin
//                     </div>
//                   </div>
//                 </Button>
//               </Link>

//               <Link href="/settings">
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start h-12 text-left"
//                 >
//                   <Settings className="mr-3 h-4 w-4" />
//                   <div>
//                     <div className="font-medium">Ayarlar</div>
//                     <div className="text-xs text-muted-foreground">
//                       Güvenlik ve tercihlerinizi yönetin
//                     </div>
//                   </div>
//                 </Button>
//               </Link>

//               <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
//                 <div className="flex items-center gap-3">
//                   <Bell className="h-4 w-4 text-blue-600" />
//                   <div>
//                     <p className="text-sm font-medium">Profil Tamamlama</p>
//                     <p className="text-xs text-muted-foreground">
//                       Profilinizi %100 tamamlayın
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Admin/Moderatör Yönetim Paneli */}
//           {isAdminOrModerator && (
//             <Card className="border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-200">
//               <CardHeader className="pb-4">
//                 <CardTitle className="flex items-center gap-3 text-lg font-semibold">
//                   <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
//                     <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
//                   </div>
//                   Yönetim Paneli
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <Link href="/admin/users">
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start h-12 text-left"
//                   >
//                     <Users className="mr-3 h-4 w-4" />
//                     <div>
//                       <div className="font-medium">Kullanıcı Yönetimi</div>
//                       <div className="text-xs text-muted-foreground">
//                         {userStats.total} kullanıcı
//                       </div>
//                     </div>
//                   </Button>
//                 </Link>

//                 {user.role === "Admin" && (
//                   <Link href="/admin/analytics">
//                     <Button
//                       variant="outline"
//                       className="w-full justify-start h-12 text-left"
//                     >
//                       <Target className="mr-3 h-4 w-4" />
//                       <div>
//                         <div className="font-medium">Analitik & Raporlar</div>
//                         <div className="text-xs text-muted-foreground">
//                           Sistem analizleri
//                         </div>
//                       </div>
//                     </Button>
//                   </Link>
//                 )}

//                 <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
//                   <div className="flex items-center gap-3">
//                     <ShieldCheck className="h-4 w-4 text-green-600" />
//                     <div>
//                       <p className="text-sm font-medium">Sistem Durumu</p>
//                       <p className="text-xs text-muted-foreground">
//                         Tüm sistemler normal
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Normal kullanıcılar için öneriler */}
//           {!isAdminOrModerator && (
//             <Card className="border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-200">
//               <CardHeader className="pb-4">
//                 <CardTitle className="flex items-center gap-3 text-lg font-semibold">
//                   <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
//                     <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
//                   </div>
//                   Öneriler
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <User className="h-4 w-4 text-emerald-600" />
//                       <div>
//                         <p className="text-sm font-medium">
//                           Profil Fotoğrafı Ekle
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           Hesabınızı kişiselleştirin
//                         </p>
//                       </div>
//                     </div>
//                     <Badge variant="secondary" className="text-xs">
//                       +10 puan
//                     </Badge>
//                   </div>
//                 </div>

//                 <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <Shield className="h-4 w-4 text-blue-600" />
//                       <div>
//                         <p className="text-sm font-medium">
//                           İki Faktörlü Doğrulama
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           Hesabınızı güvenli hale getirin
//                         </p>
//                       </div>
//                     </div>
//                     <Badge variant="secondary" className="text-xs">
//                       Önerilen
//                     </Badge>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Settings,
  Shield,
  ShieldCheck,
  User,
  TrendingUp,
  Clock,
  BarChart3,
  Activity,
  Zap,
  Star,
  Calendar,
  Bell,
  Sparkles,
  Crown,
  Target,
  Award,
  ArrowRight,
  Flame,
  Gem,
  Rocket,
  CloudLightningIcon as Lightning,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getUserList } from "@/lib/services/user.service";

// User interface tanımı
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

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [userStats, setUserStats] = useState({
    total: 0,
    active: 0,
    verified: 0,
  });

  const isAdminOrModerator =
    user?.role === "Admin" || user?.role === "Moderator";

  // Admin/Moderatör için kullanıcı istatistiklerini yükle
  useEffect(() => {
    if (isAdminOrModerator) {
      const loadUserStats = async () => {
        try {
          const response = await getUserList();
          const users: UserData[] = response.users;
          setUserStats({
            total: users.length,
            active: users.filter((u: UserData) => u.isActive).length,
            verified: users.filter((u: UserData) => u.isVerified).length,
          });
        } catch (error) {
          console.error("İstatistikler yüklenirken hata:", error);
        }
      };
      loadUserStats();
    }
  }, [isAdminOrModerator]);

  if (!user) {
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

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Günaydın"
      : currentHour < 18
      ? "İyi günler"
      : "İyi akşamlar";

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
          <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm"></div>

            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-48 translate-x-48 animate-float"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/15 to-transparent rounded-full translate-y-32 -translate-x-32 animate-float-delayed"></div>
            </div>

            <div className="relative z-10 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Premium Avatar */}
                  <div className="relative group">
                    <div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-105 transition-all duration-300">
                      <span className="text-white font-bold text-3xl drop-shadow-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-violet-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                        {greeting}, {user.name}!
                      </h1>
                      <div className="animate-bounce">
                        <Sparkles className="w-8 h-8 text-yellow-300 drop-shadow-lg" />
                      </div>
                    </div>
                    <p className="text-white/90 text-lg font-medium drop-shadow">
                      {new Date().toLocaleDateString("tr-TR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-gradient-to-r from-white/20 to-white/10 text-white border-white/30 backdrop-blur-sm px-4 py-2 shadow-lg hover:scale-105 transition-transform duration-200">
                        <Crown className="w-4 h-4 mr-2" />
                        {user.role}
                      </Badge>
                      {user.isVerified && (
                        <Badge className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 text-emerald-100 border-emerald-400/30 backdrop-blur-sm px-4 py-2 shadow-lg hover:scale-105 transition-transform duration-200">
                          <ShieldCheck className="w-4 h-4 mr-2" />
                          Doğrulanmış
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Premium Status Indicator */}
                <div className="hidden lg:block">
                  <div className="relative group">
                    <div className="w-36 h-36 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-105 transition-all duration-300">
                      <div className="relative">
                        <Activity className="w-20 h-20 text-white/90 drop-shadow-lg" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                      </div>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra Premium Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Hesap Durumu */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/80 to-emerald-50/80 dark:from-slate-900/80 dark:to-emerald-950/40 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

              <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Hesap Durumu
                </CardTitle>
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <UserCheck className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    {user.isVerified ? "Aktif" : "Beklemede"}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {user.isVerified
                      ? "Tüm özellikler kullanılabilir"
                      : "E-posta doğrulaması gerekli"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Progress
                    value={user.isVerified ? 100 : 50}
                    className="h-2 bg-slate-200 dark:bg-slate-700"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Tamamlanma</span>
                    <span className="font-semibold text-emerald-600">
                      {user.isVerified ? "100%" : "50%"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Yetki Seviyesi */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-slate-900/80 dark:to-blue-950/40 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

              <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Yetki Seviyesi
                </CardTitle>
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {user.role === "Admin" ? (
                      <Crown className="h-6 w-6 text-white" />
                    ) : user.role === "Moderator" ? (
                      <Shield className="h-6 w-6 text-white" />
                    ) : (
                      <User className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {user.role}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {user.role === "Admin"
                      ? "Tam sistem kontrolü"
                      : user.role === "Moderator"
                      ? "Kullanıcı yönetimi yetkisi"
                      : "Standart kullanıcı erişimi"}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i <
                          (user.role === "Admin"
                            ? 5
                            : user.role === "Moderator"
                            ? 4
                            : 3)
                            ? "text-yellow-500 fill-current"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {user.role === "Admin"
                      ? "Maksimum"
                      : user.role === "Moderator"
                      ? "Yüksek"
                      : "Standart"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Admin/Moderatör İstatistikleri */}
            {isAdminOrModerator && (
              <>
                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-slate-900/80 dark:to-purple-950/40 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                  <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Toplam Kullanıcı
                    </CardTitle>
                    <div className="relative">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-4">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {userStats.total}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Kayıtlı kullanıcı sayısı
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">
                        +12% bu ay
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/80 to-orange-50/80 dark:from-slate-900/80 dark:to-orange-950/40 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                  <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Aktif Kullanıcı
                    </CardTitle>
                    <div className="relative">
                      <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-4">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {userStats.active}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Son 30 gün içinde aktif
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Progress
                        value={(userStats.active / userStats.total) * 100}
                        className="h-2 bg-slate-200 dark:bg-slate-700"
                      />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Aktivite Oranı</span>
                        <span className="font-semibold text-orange-600">
                          {Math.round(
                            (userStats.active / userStats.total) * 100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Normal kullanıcılar için aktivite */}
            {!isAdminOrModerator && (
              <>
                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/80 to-violet-50/80 dark:from-slate-900/80 dark:to-violet-950/40 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-400 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                  <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Son Aktivite
                    </CardTitle>
                    <div className="relative">
                      <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-4">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        Bugün
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Dashboarda giriş yaptınız
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 p-2 bg-violet-50 dark:bg-violet-950/20 rounded-lg">
                      <Calendar className="w-4 h-4 text-violet-500" />
                      <span className="text-sm font-medium text-violet-600">
                        {new Date().toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/80 to-teal-50/80 dark:from-slate-900/80 dark:to-teal-950/40 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                  <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Başarılar
                    </CardTitle>
                    <div className="relative">
                      <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-4">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        5/5
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Profil tamamlama oranı
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Progress
                        value={100}
                        className="h-2 bg-slate-200 dark:bg-slate-700"
                      />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">İlerleme</span>
                        <span className="font-semibold text-teal-600">
                          100%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Ultra Premium Action Cards */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Hesap İşlemleri */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="relative z-10 pb-6">
                <CardTitle className="flex items-center gap-4 text-xl font-bold">
                  <div className="relative">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur opacity-40"></div>
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Hesap İşlemleri
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                <Link href="/profile" className="block group/item">
                  <div className="relative overflow-hidden bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-800 dark:to-blue-950/20 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 group-hover/item:scale-[1.02] group-hover/item:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-xl">
                          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            Profili Düzenle
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            Kişisel bilgilerinizi güncelleyin
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover/item:text-blue-500 group-hover/item:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </Link>

                <Link href="/settings" className="block group/item">
                  <div className="relative overflow-hidden bg-gradient-to-r from-slate-50 to-purple-50/50 dark:from-slate-800 dark:to-purple-950/20 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 transition-all duration-300 group-hover/item:scale-[1.02] group-hover/item:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl">
                          <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            Ayarlar
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            Güvenlik ve tercihlerinizi yönetin
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover/item:text-purple-500 group-hover/item:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </Link>

                <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-4 border border-blue-200/50 dark:border-blue-800/50">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                      <Bell className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 dark:text-blue-100">
                        Profil Tamamlama
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Profilinizi %100 tamamlayın ve özel rozetler kazanın
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Gem className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-600">
                        +50 XP
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin/Moderatör Yönetim Paneli */}
            {isAdminOrModerator && (
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardHeader className="relative z-10 pb-6">
                  <CardTitle className="flex items-center gap-4 text-xl font-bold">
                    <div className="relative">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur opacity-40"></div>
                    </div>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Yönetim Paneli
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4">
                  <Link href="/admin/users" className="block group/item">
                    <div className="relative overflow-hidden bg-gradient-to-r from-slate-50 to-purple-50/50 dark:from-slate-800 dark:to-purple-950/20 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 transition-all duration-300 group-hover/item:scale-[1.02] group-hover/item:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl">
                            <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              Kullanıcı Yönetimi
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {userStats.total} kullanıcı
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                            Yeni
                          </Badge>
                          <ChevronRight className="h-5 w-5 text-slate-400 group-hover/item:text-purple-500 group-hover/item:translate-x-1 transition-all duration-200" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {user.role === "Admin" && (
                    <Link href="/admin/analytics" className="block group/item">
                      <div className="relative overflow-hidden bg-gradient-to-r from-slate-50 to-orange-50/50 dark:from-slate-800 dark:to-orange-950/20 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 hover:border-orange-300/50 dark:hover:border-orange-600/50 transition-all duration-300 group-hover/item:scale-[1.02] group-hover/item:shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/50 dark:to-red-900/50 rounded-xl">
                              <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 dark:text-slate-100">
                                Analitik & Raporlar
                              </div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                Sistem analizleri ve performans
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Rocket className="h-4 w-4 text-orange-500" />
                            <ChevronRight className="h-5 w-5 text-slate-400 group-hover/item:text-orange-500 group-hover/item:translate-x-1 transition-all duration-200" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}

                  <div className="relative overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-4 border border-green-200/50 dark:border-green-800/50">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                        <ShieldCheck className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-green-900 dark:text-green-100">
                          Sistem Durumu
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Tüm sistemler normal çalışıyor
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-600">
                          Online
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Normal kullanıcılar için öneriler */}
            {!isAdminOrModerator && (
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardHeader className="relative z-10 pb-6">
                  <CardTitle className="flex items-center gap-4 text-xl font-bold">
                    <div className="relative">
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl blur opacity-40"></div>
                    </div>
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Öneriler & Görevler
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4">
                  <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl p-4 border border-emerald-200/50 dark:border-emerald-800/50 hover:border-emerald-300/50 dark:hover:border-emerald-600/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg group/task">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-emerald-900 dark:text-emerald-100">
                            Profil Fotoğrafı Ekle
                          </p>
                          <p className="text-sm text-emerald-600 dark:text-emerald-400">
                            Hesabınızı kişiselleştirin ve tanınır olun
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 dark:from-yellow-900/50 dark:to-orange-900/50 dark:text-yellow-300 border-0">
                          <Flame className="w-3 h-3 mr-1" />
                          +10 XP
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-emerald-500 group-hover/task:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-4 border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg group/task">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-blue-900 dark:text-blue-100">
                            İki Faktörlü Doğrulama
                          </p>
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            Hesabınızı maksimum güvenlik ile koruyun
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-300 border-0">
                          <Lightning className="w-3 h-3 mr-1" />
                          Önerilen
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-blue-500 group-hover/task:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-4 border border-purple-200/50 dark:border-purple-800/50">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-purple-900 dark:text-purple-100">
                          Haftalık Hedef
                        </p>
                        <p className="text-sm text-purple-600 dark:text-purple-400">
                          3 görev daha tamamlayın ve özel rozet kazanın
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">
                          2/5
                        </div>
                        <div className="text-xs text-purple-500">
                          Tamamlandı
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
