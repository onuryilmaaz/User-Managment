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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  ShieldCheck,
  User,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Edit3,
  Sparkles,
  Crown,
  Star,
  ExternalLink,
  Activity,
  Award,
  Gem,
  Zap,
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();

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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Crown className="w-4 h-4" />;
      case "Moderator":
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/25";
      case "Moderator":
        return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25";
      default:
        return "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Ultra Premium Header Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-2xl">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm"></div>

            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1)_0%,transparent_50%)] animate-pulse"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-400/20 to-transparent rounded-full -translate-y-48 translate-x-48 animate-float"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-400/15 to-transparent rounded-full translate-y-32 -translate-x-32 animate-float-delayed"></div>
            </div>

            <div className="relative z-10 p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                {/* Premium Avatar Section */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative">
                    <Avatar className="h-32 w-32 ring-4 ring-white/50 dark:ring-slate-700/50 shadow-2xl group-hover:scale-105 transition-all duration-300">
                      <AvatarImage
                        src={user.profilePicture || "/placeholder.svg"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-4xl font-bold">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Premium Status Indicator */}
                    <div className="absolute -bottom-2 -right-2">
                      <Badge
                        className={`${getRoleColor(
                          user.role
                        )} border-0 px-3 py-1 hover:scale-105 transition-transform duration-200`}
                      >
                        {getRoleIcon(user.role)}
                        <span className="ml-2 font-semibold">{user.role}</span>
                      </Badge>
                    </div>

                    {/* Verification Badge */}
                    {user.isVerified && (
                      <div className="absolute -top-2 -left-2">
                        <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-xl border-2 border-white dark:border-slate-800">
                          <ShieldCheck className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Premium User Info */}
                <div className="flex-1 space-y-6">
                  <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                            {user.name} {user.surname}
                          </h1>
                          <div className="animate-bounce">
                            <Sparkles className="w-6 h-6 text-yellow-500" />
                          </div>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
                          @{user.username}
                        </p>
                      </div>

                      {user.bio && (
                        <div className="relative overflow-hidden bg-gradient-to-r from-slate-50/80 to-blue-50/80 dark:from-slate-800/80 dark:to-blue-950/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            {user.bio}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4">
                        {user.location?.city && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
                            <MapPin className="w-4 h-4 text-indigo-500" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {user.location.city}
                              {user.location.country &&
                                `, ${user.location.country}`}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-100 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl border border-emerald-200/50 dark:border-emerald-600/50">
                          <Calendar className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Katıldı{" "}
                            {new Date(user.createdAt).toLocaleDateString(
                              "tr-TR",
                              {
                                year: "numeric",
                                month: "long",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Premium Action Button */}
                    <div className="flex justify-center lg:justify-end">
                      <ProfileEditDialog />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* İletişim Bilgileri - Premium */}
            <Card className="xl:col-span-2 group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="relative z-10 pb-6">
                <CardTitle className="flex items-center gap-4 text-xl font-bold">
                  <div className="relative">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur opacity-40"></div>
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    İletişim Bilgileri
                  </span>
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
                  Kişisel iletişim ve bağlantı bilgileriniz.
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Card */}
                  <div className="group/item relative overflow-hidden bg-gradient-to-br from-slate-50/80 to-blue-50/80 dark:from-slate-800/80 dark:to-blue-950/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur opacity-40 group-hover/item:opacity-60 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">
                          E-posta
                        </p>
                        <p className="font-bold text-slate-900 dark:text-white truncate mt-1">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="group/item relative overflow-hidden bg-gradient-to-br from-slate-50/80 to-emerald-50/80 dark:from-slate-800/80 dark:to-emerald-950/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:border-emerald-300/50 dark:hover:border-emerald-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl blur opacity-40 group-hover/item:opacity-60 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">
                          Telefon
                        </p>
                        <p className="font-bold text-slate-900 dark:text-white truncate mt-1">
                          {user.phone || "Belirtilmemiş"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Achievement Section */}
                <div className="relative overflow-hidden bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-2xl p-6 border border-violet-200/50 dark:border-violet-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-violet-900 dark:text-violet-100">
                          Profil Uzmanı
                        </p>
                        <p className="text-sm text-violet-600 dark:text-violet-400">
                          Tüm bilgilerinizi eksiksiz doldurdunuz
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gem className="w-5 h-5 text-violet-500" />
                      <span className="font-bold text-violet-600 dark:text-violet-400">
                        +100 XP
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sosyal Medya Bağlantıları - Premium */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="relative z-10 pb-6">
                <CardTitle className="flex items-center gap-4 text-xl font-bold">
                  <div className="relative">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl blur opacity-40"></div>
                  </div>
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Sosyal Medya
                  </span>
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
                  Sosyal medya hesaplarınız ve bağlantılarınız.
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                {user.social?.github && (
                  <a
                    href={user.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social block"
                  >
                    <div className="relative overflow-hidden bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/80 dark:to-gray-900/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 hover:border-gray-400/50 dark:hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-gray-700 to-black rounded-xl shadow-lg group-hover/social:scale-110 transition-transform duration-200">
                            <Github className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            GitHub
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover/social:text-gray-600 group-hover/social:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </a>
                )}

                {user.social?.twitter && (
                  <a
                    href={user.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social block"
                  >
                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-50/80 to-sky-50/80 dark:from-blue-900/20 dark:to-sky-900/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-400/50 dark:hover:border-blue-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl shadow-lg group-hover/social:scale-110 transition-transform duration-200">
                            <Twitter className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            Twitter
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover/social:text-blue-600 group-hover/social:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </a>
                )}

                {user.social?.linkedin && (
                  <a
                    href={user.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social block"
                  >
                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-400/50 dark:hover:border-blue-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg group-hover/social:scale-110 transition-transform duration-200">
                            <Linkedin className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            LinkedIn
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover/social:text-blue-600 group-hover/social:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </a>
                )}

                {user.social?.website && (
                  <a
                    href={user.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social block"
                  >
                    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50/80 to-green-50/80 dark:from-emerald-900/20 dark:to-green-900/20 backdrop-blur-sm rounded-2xl p-4 border border-emerald-200/50 dark:border-emerald-700/50 hover:border-emerald-400/50 dark:hover:border-emerald-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg group-hover/social:scale-110 transition-transform duration-200">
                            <Globe className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            Website
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover/social:text-emerald-600 group-hover/social:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </a>
                )}

                {!user.social?.github &&
                  !user.social?.twitter &&
                  !user.social?.linkedin &&
                  !user.social?.website && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center mb-4">
                        <Globe className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">
                        Henüz sosyal medya hesabı eklenmemiş.
                      </p>
                      <ProfileEditDialog />
                    </div>
                  )}

                {/* Premium Social Stats */}
                {(user.social?.github ||
                  user.social?.twitter ||
                  user.social?.linkedin ||
                  user.social?.website) && (
                  <div className="relative overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl p-4 border border-indigo-200/50 dark:border-indigo-800/50 mt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-indigo-900 dark:text-indigo-100">
                            Sosyal Profil
                          </p>
                          <p className="text-sm text-indigo-600 dark:text-indigo-400">
                            Bağlantı hesapları aktif
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-indigo-500" />
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">
                          Aktif
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Bio Eksikse Premium Tamamlama Kartı */}
          {!user.bio && (
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 to-amber-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardContent className="relative z-10 p-12 text-center">
                <div className="max-w-md mx-auto space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center shadow-2xl">
                      <Edit3 className="w-10 h-10 text-orange-500" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full blur opacity-20 animate-pulse"></div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      Profilinizi Tamamlayın
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      Biyografi ekleyerek profilinizi daha kişisel hale getirin
                      ve diğer kullanıcılarla daha iyi bağlantı kurun.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-2xl border border-orange-200/50 dark:border-orange-800/50">
                    <Star className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      +50 XP Kazanın
                    </span>
                    <Gem className="w-5 h-5 text-orange-500" />
                  </div>

                  <div className="pt-4">
                    <ProfileEditDialog />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
