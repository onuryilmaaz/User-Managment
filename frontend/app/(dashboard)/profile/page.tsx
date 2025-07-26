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
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <ShieldCheck className="w-4 h-4" />;
      case "Moderator":
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white";
      case "Moderator":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
      default:
        return "bg-gradient-to-r from-green-500 to-green-600 text-white";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Premium Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20 p-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar Section */}
          <div className="relative">
            <Avatar className="h-24 w-24 ring-4 ring-white dark:ring-gray-800 shadow-xl">
              <AvatarImage src={user.profilePicture} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white text-2xl font-bold">
                {user.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2">
              <Badge
                className={`${getRoleColor(user.role)} shadow-lg border-0`}
              >
                {getRoleIcon(user.role)}
                <span className="ml-1">{user.role}</span>
              </Badge>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {user.name} {user.surname}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  @{user.username}
                </p>
              </div>
              <ProfileEditDialog />
            </div>

            {user.bio && (
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                {user.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4 pt-2">
              {user.location?.city && (
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  {user.location.city}
                  {user.location.country && `, ${user.location.country}`}
                </div>
              )}
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                Katıldı{" "}
                {new Date(user.createdAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* İletişim Bilgileri */}
        <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-500" />
              İletişim Bilgileri
            </CardTitle>
            <CardDescription>
              Kişisel iletişim ve bağlantı bilgileriniz.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <Mail className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    E-posta
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Telefon
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user.phone || "Belirtilmemiş"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sosyal Medya Bağlantıları */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              Sosyal Medya
            </CardTitle>
            <CardDescription>Sosyal medya hesaplarınız.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {user.social?.github && (
              <a
                href={user.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <Github className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  GitHub
                </span>
              </a>
            )}

            {user.social?.twitter && (
              <a
                href={user.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <Twitter className="w-4 h-4 text-blue-400 group-hover:text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  Twitter
                </span>
              </a>
            )}

            {user.social?.linkedin && (
              <a
                href={user.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <Linkedin className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  LinkedIn
                </span>
              </a>
            )}

            {user.social?.website && (
              <a
                href={user.social.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <Globe className="w-4 h-4 text-green-500 group-hover:text-green-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  Website
                </span>
              </a>
            )}

            {!user.social?.github &&
              !user.social?.twitter &&
              !user.social?.linkedin &&
              !user.social?.website && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  Henüz sosyal medya hesabı eklenmemiş.
                </p>
              )}
          </CardContent>
        </Card>
      </div>

      {/* Hakkında Bölümü */}
      {!user.bio && (
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Edit3 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profilinizi tamamlayın
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Biyografi ekleyerek profilinizi daha kişisel hale getirin.
              </p>
              <ProfileEditDialog />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
