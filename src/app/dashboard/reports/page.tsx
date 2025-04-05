import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportsList } from "@/components/dashboard/reports/reports-list";
import { ReportBuilder } from "@/components/dashboard/reports/report-builder";
import { ReportScheduler } from "@/components/dashboard/reports/report-scheduler";
import { ReportDashboard } from "@/components/dashboard/reports/report-dashboard";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Reports</h1>
      <p className="text-muted-foreground">
        Generate, schedule, and view reports across all services
      </p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +2 new reports this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Next: User Activity (Tomorrow)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Exports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Last: License Usage (Today)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Create your own custom reports
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Reports Library</TabsTrigger>
          <TabsTrigger value="builder">Report Builder</TabsTrigger>
          <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports Dashboard</CardTitle>
              <CardDescription>
                Overview of key metrics and recent reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportDashboard />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports Library</CardTitle>
              <CardDescription>
                Browse and run pre-configured reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="builder" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Builder</CardTitle>
              <CardDescription>
                Create custom reports with specific data points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportBuilder />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduler" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Scheduler</CardTitle>
              <CardDescription>
                Schedule reports to run automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportScheduler />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
