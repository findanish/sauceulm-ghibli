import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OffboardUserForm } from "@/components/dashboard/offboard/offboard-user-form";
import { OffboardHistory } from "@/components/dashboard/offboard/offboard-history";
import { OffboardTemplates } from "@/components/dashboard/offboard/offboard-templates";
import { OffboardChecklist } from "@/components/dashboard/offboard/offboard-checklist";

export default function OffboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Employee Offboarding</h1>
      <p className="text-muted-foreground">
        Streamlined process to offboard employees from all systems
      </p>
      
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="new">New Offboarding</TabsTrigger>
          <TabsTrigger value="history">Offboarding History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>New Employee Offboarding</CardTitle>
              <CardDescription>
                Start the offboarding process for an employee
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OffboardUserForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Offboarding History</CardTitle>
              <CardDescription>
                View past and ongoing offboarding processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OffboardHistory />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Offboarding Templates</CardTitle>
              <CardDescription>
                Manage templates for different offboarding scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OffboardTemplates />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="checklist" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Offboarding Checklist</CardTitle>
              <CardDescription>
                Customize the offboarding checklist for your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OffboardChecklist />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
