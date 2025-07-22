"use client";

import { useState, useEffect } from "react";
import { getUserActivities, Activity } from "@/lib/services/activity.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import {
  Activity as ActivityIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadActivities = async (page: number) => {
    try {
      setLoading(true);
      const response = await getUserActivities(page, 10);
      setActivities(response.activities);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (error) {
      console.error("Aktiviteler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities(1);
  }, []);

  const getActivityIcon = (action: string) => {
    switch (action) {
      case "login":
        return "🔐";
      case "logout":
        return "🚪";
      case "profile_update":
        return "👤";
      case "password_change":
        return "🔑";
      case "email_verification":
        return "✅";
      case "password_reset":
        return "🔄";
      case "profile_picture_update":
        return "📸";
      default:
        return "📝";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Aktivite Geçmişi</h1>
        <p className="text-muted-foreground">
          Hesabınızdaki son aktiviteleri görüntüleyin.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ActivityIcon className="h-5 w-5" />
            Son Aktiviteler
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Yükleniyor...</div>
          ) : activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Henüz aktivite bulunmuyor.
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  className="flex items-start gap-3 p-3 border rounded-lg"
                >
                  <div className="text-2xl">
                    {getActivityIcon(activity.action)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.createdAt), {
                        addSuffix: true,
                        locale: tr,
                      })}
                    </p>
                    {activity.ipAddress && (
                      <p className="text-xs text-muted-foreground mt-1">
                        IP: {activity.ipAddress}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => loadActivities(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Önceki
              </Button>
              <span className="text-sm text-muted-foreground">
                Sayfa {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => loadActivities(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Sonraki
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
