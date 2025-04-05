import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditLogTable } from "@/components/dashboard/audit-logs/audit-log-table";
import { AuditLogFilters } from "@/components/dashboard/audit-logs/audit-log-filters";
import { AuditLogStats } from "@/components/dashboard/audit-logs/audit-log-stats";

export default function AuditLogsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Audit Logs</h1>
      <p className="text-muted-foreground">
        View and analyze security audit logs across all services
      </p>
      
      <div className="grid gap-4 md:grid-cols-3">
        <AuditLogStats />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Audit Log Filters</CardTitle>
          <CardDescription>
            Filter logs by service, event type, user, date range, and more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuditLogFilters />
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Logs</TabsTrigger>
          <TabsTrigger value="okta">Okta</TabsTrigger>
          <TabsTrigger value="slack">Slack</TabsTrigger>
          <TabsTrigger value="google">Google Workspace</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Audit Logs</CardTitle>
              <CardDescription>
                Comprehensive audit logs from all integrated services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogTable service="all" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="okta" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Okta Audit Logs</CardTitle>
              <CardDescription>
                Authentication and user management events from Okta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogTable service="okta" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="slack" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Slack Audit Logs</CardTitle>
              <CardDescription>
                Workspace and channel events from Slack
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogTable service="slack" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="google" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Google Workspace Audit Logs</CardTitle>
              <CardDescription>
                Admin and user events from Google Workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogTable service="google" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Audit Logs</CardTitle>
              <CardDescription>
                Internal system events and admin actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogTable service="system" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
