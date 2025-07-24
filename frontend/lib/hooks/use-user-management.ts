"use client";

import { useState, useCallback } from "react";
import {
  getUserList,
  deleteUser,
  toggleUserStatus,
  changeUserRole,
} from "@/lib/services/user.service";
import {
  GetUserListPayload,
  UserListResponse,
  UserResponse,
} from "@/lib/validators/user.schema";
import { toast } from "sonner";

export function useUserManagement() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const fetchUsers = useCallback(async (params?: GetUserListPayload) => {
    setIsLoading(true);
    try {
      const response: UserListResponse = await getUserList(params);
      setUsers(response.users);
      setTotalUsers(response.totalUsers);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      setHasNextPage(response.hasNextPage);
      setHasPrevPage(response.hasPrevPage);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Kullanıcı listesi alınırken hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteUser = useCallback(async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(user => user._id !== userId));
      setTotalUsers(prev => prev - 1);
      toast.success("Kullanıcı başarıyla silindi.");
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Kullanıcı silinirken hata oluştu.");
    }
  }, []);

  const handleToggleUserStatus = useCallback(async (userId: string) => {
    try {
      const response = await toggleUserStatus(userId);
      setUsers(prev => 
        prev.map(user => 
          user._id === userId ? response.user : user
        )
      );
      toast.success(response.message);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Kullanıcı durumu değiştirilirken hata oluştu.");
    }
  }, []);

  const handleChangeUserRole = useCallback(async (
    userId: string, 
    role: "User" | "Moderator"
  ) => {
    try {
      const response = await changeUserRole(userId, role);
      setUsers(prev => 
        prev.map(user => 
          user._id === userId ? response.user : user
        )
      );
      toast.success(response.message);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Kullanıcı rolü değiştirilirken hata oluştu.");
    }
  }, []);

  return {
    users,
    totalUsers,
    totalPages,
    currentPage,
    hasNextPage,
    hasPrevPage,
    isLoading,
    fetchUsers,
    handleDeleteUser,
    handleToggleUserStatus,
    handleChangeUserRole,
  };
}