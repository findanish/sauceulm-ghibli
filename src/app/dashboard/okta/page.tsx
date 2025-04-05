import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OktaUserTable } from "@/components/dashboard/okta/user-table";
import { OktaGroupTable } from "@/components/dashboard/okta/group-table";
import { OktaAppTable } from "@/components/dashboard/okta/app-table";

export default function OktaPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Okta Management</h1>
      <p className="text-muted-foreground">
        Manage your Okta users, groups, and applications
      </p>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage your Okta users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OktaUserTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="groups" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Groups</CardTitle>
              <CardDescription>
                Manage your Okta groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OktaGroupTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="applications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>
                Manage your Okta applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OktaAppTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
