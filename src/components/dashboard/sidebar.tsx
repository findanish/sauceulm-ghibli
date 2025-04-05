"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Mail,
  Settings,
  FileText,
  UserMinus,
  Search,
  ShieldAlert
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/okta",
      label: "Okta",
      icon: Users,
      active: pathname === "/dashboard/okta",
    },
    {
      href: "/dashboard/slack",
      label: "Slack",
      icon: MessageSquare,
      active: pathname === "/dashboard/slack",
    },
    {
      href: "/dashboard/google-workspace",
      label: "Google Workspace",
      icon: Mail,
      active: pathname === "/dashboard/google-workspace",
    },
    {
      href: "/dashboard/audit-logs",
      label: "Audit Logs",
      icon: ShieldAlert,
      active: pathname === "/dashboard/audit-logs",
    },
    {
      href: "/dashboard/reports",
      label: "Reports",
      icon: FileText,
      active: pathname === "/dashboard/reports",
    },
    {
      href: "/dashboard/offboard",
      label: "Offboarding",
      icon: UserMinus,
      active: pathname === "/dashboard/offboard",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/dashboard/settings",
    },
  ];

  return (
    <div className="hidden border-r bg-[#f0e6c9] lg:block lg:w-60 fixed top-14 bottom-0 left-0 z-10 overflow-y-auto shadow-sm">
      <div className="flex h-full flex-col">
        <div className="px-3 py-4">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#8b7e57]" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg border-2 border-[#8b7e57] bg-[#f0e6c9] py-2 pl-8 pr-4 text-sm text-[#5c4c29] placeholder:text-[#8b7e57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7e57] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </form>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-[#5c4c29] transition-all hover:bg-[#e8deb8]",
                  route.active && "bg-[#e8deb8] font-bold"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
