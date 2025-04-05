import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoogleUserTable } from "@/components/dashboard/google-workspace/user-table";
import { GoogleGroupTable } from "@/components/dashboard/google-workspace/group-table";
import { GoogleDriveSettings } from "@/components/dashboard/google-workspace/drive-settings";
import { GoogleAdminSettings } from "@/components/dashboard/google-workspace/admin-settings";

export default function GoogleWorkspacePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Google Workspace Management</h1>
      <p className="text-muted-foreground">
        Manage your Google Workspace users, groups, and settings using the Admin and Directory SDK
      </p>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="drive">Drive Settings</TabsTrigger>
          <TabsTrigger value="admin">Admin Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage your Google Workspace users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoogleUserTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="groups" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Groups</CardTitle>
              <CardDescription>
                Manage your Google Workspace groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoogleGroupTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="drive" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Drive Settings</CardTitle>
              <CardDescription>
                Configure Google Drive settings for your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoogleDriveSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admin" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>
                Configure Google Workspace admin settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoogleAdminSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
