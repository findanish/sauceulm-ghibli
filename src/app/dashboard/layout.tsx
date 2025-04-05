import { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export const metadata: Metadata = {
  title: "SauceULM_ | Admin Dashboard",
  description: "SauceULM_ Admin dashboard for Okta, Slack, and Google Workspace",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1"> {/* Content below fixed header */}
        <Sidebar />
        <div className="flex-1 lg:ml-60 mt-14"> {/* Added mt-14 to account for header height */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
