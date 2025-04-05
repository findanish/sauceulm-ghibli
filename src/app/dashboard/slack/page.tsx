import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SlackUserTable } from "@/components/dashboard/slack/user-table";
import { SlackChannelTable } from "@/components/dashboard/slack/channel-table";
import { SlackWorkspaceSettings } from "@/components/dashboard/slack/workspace-settings";

export default function SlackPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Slack Management</h1>
      <p className="text-muted-foreground">
        Manage your Slack users, channels, and workspace settings
      </p>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="settings">Workspace Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage your Slack workspace users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SlackUserTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="channels" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Channels</CardTitle>
              <CardDescription>
                Manage your Slack channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SlackChannelTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Settings</CardTitle>
              <CardDescription>
                Configure your Slack workspace settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SlackWorkspaceSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
