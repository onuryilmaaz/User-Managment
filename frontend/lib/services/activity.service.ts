import api from "../api";

export interface Activity {
  _id: string;
  action: string;
  description: string;
  createdAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ActivityResponse {
  activities: Activity[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const getUserActivities = async (
  page = 1,
  limit = 10
): Promise<ActivityResponse> => {
  try {
    const { data } = await api.get(
      `/api/activity/my-activities?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Aktiviteler yüklenirken hata oluştu.";
    throw new Error(errorMessage);
  }
};
