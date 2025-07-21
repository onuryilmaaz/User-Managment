"use client";

import { useId, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useAuthStore } from "@/lib/hooks/use-auth.store";
import { updateUserProfile } from "@/lib/services/user.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // YENİ IMPORT
import { ImagePlus, Loader2 } from "lucide-react";
import { useImageUpload } from "@/lib/hooks/use-image-upload";
import {
  UpdateProfilePayload,
  UpdateProfileSchema,
} from "@/lib/validators/auth.schema";

// Ana Bileşen
export function ProfileEditDialog() {
  const { user, setUser } = useAuthStore();
  const {
    previewUrl,
    uploadedImageUrl,
    fileInputRef,
    handleFileChange,
    handleThumbnailClick,
    isUploading,
  } = useImageUpload();

  const form = useForm<UpdateProfilePayload>({
    resolver: zodResolver(UpdateProfileSchema),
    // Formun varsayılan değerlerini 'user' state'inden alıyoruz
    defaultValues: {
      name: user?.name || "",
      surname: user?.surname || "",
      username: user?.username || "",
      bio: user?.bio || "",
      profilePicture: user?.profilePicture || "",
      phone: user?.phone || "",
      location: {
        country: user?.location?.country || "",
        city: user?.location?.city || "",
      },
      social: {
        github: user?.social?.github || "",
        twitter: user?.social?.twitter || "",
        linkedin: user?.social?.linkedin || "",
        website: user?.social?.website || "",
      },
    },
  });

  // Resim yükleme başarılı olduğunda, formdaki 'profilePicture' alanını güncelle
  useEffect(() => {
    if (uploadedImageUrl) {
      form.setValue("profilePicture", uploadedImageUrl, {
        shouldValidate: true,
      });
    }
  }, [uploadedImageUrl, form]);

  async function onSubmit(values: UpdateProfilePayload) {
    try {
      const response = await updateUserProfile(values);
      setUser(response.user);
      toast.success("Profil başarıyla güncellendi!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Profili Düzenle</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>Profili Düzenle</DialogTitle>
              <DialogDescription>
                Profilinizde değişiklik yapın. İşiniz bitince kaydedin.
              </DialogDescription>
            </DialogHeader>

            {/* SEKMELİ YAPI BAŞLANGICI */}
            <div className="p-6">
              <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">Genel</TabsTrigger>
                  <TabsTrigger value="contact">İletişim</TabsTrigger>
                  <TabsTrigger value="social">Sosyal Medya</TabsTrigger>
                </TabsList>

                {/* 1. GENEL SEKME İÇERİĞİ */}
                <TabsContent value="general" className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="profilePicture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profil Resmi</FormLabel>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-24 w-24">
                            {/* ÖNİZLEME BURADA GÖSTERİLİYOR */}
                            <AvatarImage
                              src={previewUrl || field.value || undefined}
                            />
                            <AvatarFallback>
                              {user?.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleThumbnailClick}
                            disabled={isUploading}
                          >
                            {isUploading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <ImagePlus className="mr-2 h-4 w-4" />
                            )}
                            {isUploading ? "Yükleniyor..." : "Değiştir"}
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                          />
                        </div>
                        <FormMessage />
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
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* 2. İLETİŞİM SEKME İÇERİĞİ */}
                <TabsContent value="contact" className="space-y-4 pt-4">
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
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="location.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ülke</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Şehir</FormLabel>
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
                    name="social.website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* 3. SOSYAL MEDYA SEKME İÇERİĞİ */}
                <TabsContent value="social" className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="social.github"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://github.com/kullaniciadi"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="social.twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter (X)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://twitter.com/kullaniciadi"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="social.linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://linkedin.com/in/kullaniciadi"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="px-6 py-4 border-t">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Kaydediliyor..."
                  : "Değişiklikleri Kaydet"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
