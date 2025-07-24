"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useAuthStore } from "@/lib/hooks/use-auth.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { updateUserProfile } from "@/lib/services/user.service";
import {
  UpdateUserProfilePayload,
  UpdateUserProfileSchema,
} from "@/lib/validators/user.schema";

export function UpdateProfileForm() {
  const { user, setUser } = useAuthStore();

  const form = useForm<UpdateUserProfilePayload>({
    resolver: zodResolver(UpdateUserProfileSchema),
    defaultValues: {
      profilePicture: user?.profilePicture ?? "",
      name: user?.name ?? "",
      surname: user?.surname ?? "",
      username: user?.username ?? "",
      bio: user?.bio ?? "",
      phone: user?.phone ?? "",
      location: {
        country: user?.location?.country ?? "",
        city: user?.location?.city ?? "",
      },
      social: {
        github: user?.social?.github ?? "",
        twitter: user?.social?.twitter ?? "",
        linkedin: user?.social?.linkedin ?? "",
        website: user?.social?.website ?? "",
      },
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: UpdateUserProfilePayload) {
    try {
      const response = await updateUserProfile(values);
      // Başarılı olursa, global state'i (Zustand) yeni kullanıcı bilgileriyle güncelle
      setUser(response);
      toast.success("Profil başarıyla güncellendi!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Bir hata oluştu";
      toast.error(errorMessage);
    }
  }

  if (!user || !user.name || !user.surname || !user.username) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Kişisel Bilgiler Kartı */}
        <Card>
          <CardHeader>
            <CardTitle>Kişisel Bilgiler</CardTitle>
            <CardDescription>
              Herkese açık görünecek temel bilgileriniz.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={field.value || ""} />
                    <AvatarFallback>
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full space-y-2">
                    <FormLabel>Profil Resmi URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İsim</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soyisim</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kullanıcı Adı</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biyografi</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* İletişim Bilgileri Kartı */}
        <Card>
          <CardHeader>
            <CardTitle>İletişim Bilgileri</CardTitle>
            <CardDescription>
              Size nasıl ulaşabileceğimizi yönetin.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormItem>
              <FormLabel>E-posta</FormLabel>
              <FormControl>
                <Input readOnly disabled value={user.email} />
              </FormControl>
            </FormItem>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social.website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://your-website.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Diğer kartlar buraya eklenebilir (Konum, Sosyal Medya vb.) */}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </Button>
      </form>
    </Form>
  );
}
