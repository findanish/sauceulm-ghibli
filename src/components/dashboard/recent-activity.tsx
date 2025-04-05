"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

const activities = [
  {
    id: 1,
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
    },
    action: "logged in",
    target: "Admin Dashboard",
    date: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
    },
    action: "created user",
    target: "alex.johnson@example.com",
    date: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: 3,
    user: {
      name: "Admin",
      email: "admin@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "AD",
    },
    action: "updated group",
    target: "Marketing Team",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 4,
    user: {
      name: "System",
      email: "system@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "SY",
    },
    action: "performed backup",
    target: "User Database",
    date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: 5,
    user: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "SJ",
    },
    action: "deleted user",
    target: "former.employee@example.com",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.action} <span className="font-medium">{activity.target}</span>
            </p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            {formatDistanceToNow(activity.date, { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  );
}
