"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface Activity {
  _id: string;
  action: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const getActionColor = (action: string) => {
  switch (action) {
    case "login":
      return "bg-green-100 text-green-800";
    case "logout":
      return "bg-blue-100 text-blue-800";
    case "profile_update":
      return "bg-yellow-100 text-yellow-800";
    case "password_change":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getActionText = (action: string) => {
  switch (action) {
    case "login":
      return "Giriş";
    case "logout":
      return "Çıkış";
    case "profile_update":
      return "Profil Güncelleme";
    case "password_change":
      return "Şifre Değişikliği";
    default:
      return action;
  }
};

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Son Aktiviteler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground">Henüz aktivite bulunmuyor.</p>
          ) : (
            activities.slice(0, 5).map((activity) => (
              <div key={activity._id} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Badge className={getActionColor(activity.action)}>
                    {getActionText(activity.action)}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium">{activity.details}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.createdAt), {
                        addSuffix: true,
                        locale: tr,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}