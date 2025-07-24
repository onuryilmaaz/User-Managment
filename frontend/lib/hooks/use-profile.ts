"use client";

import { useState, useCallback } from "react";
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
} from "@/lib/services/user.service";
import {
  UpdateUserProfilePayload,
  ChangeUserPasswordPayload,
  UserResponse,
} from "@/lib/validators/user.schema";
import { useAuthStore } from "./use-auth.store";
import { toast } from "sonner";

export function useProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { setUser } = useAuthStore();

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const user: UserResponse = await getUserProfile();
      setUser(user);
      return user;
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Profil bilgileri alınırken hata oluştu.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const updateProfile = useCallback(async (payload: UpdateUserProfilePayload) => {
    setIsUpdating(true);
    try {
      const updatedUser: UserResponse = await updateUserProfile(payload);
      setUser(updatedUser);
      toast.success("Profil başarıyla güncellendi.");
      return updatedUser;
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Profil güncellenirken hata oluştu.");
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, [setUser]);

  const changePassword = useCallback(async (payload: ChangeUserPasswordPayload) => {
    setIsChangingPassword(true);
    try {
      const response = await changeUserPassword(payload);
      toast.success(response.message || "Şifre başarıyla değiştirildi.");
      return response;
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Şifre değiştirilirken hata oluştu.");
      throw error;
    } finally {
      setIsChangingPassword(false);
    }
  }, []);

  return {
    isLoading,
    isUpdating,
    isChangingPassword,
    fetchProfile,
    updateProfile,
    changePassword,
  };
}