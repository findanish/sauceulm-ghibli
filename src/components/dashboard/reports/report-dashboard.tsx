"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Download, Star } from "lucide-react";

// Mock data for charts
const userActivityData = [
  { name: "Jan", active: 400, inactive: 240 },
  { name: "Feb", active: 300, inactive: 139 },
  { name: "Mar", active: 200, inactive: 980 },
  { name: "Apr", active: 278, inactive: 390 },
  { name: "May", active: 189, inactive: 480 },
  { name: "Jun", active: 239, inactive: 380 },
  { name: "Jul", active: 349, inactive: 430 },
];

const licenseUsageData = [
  { name: "Google Workspace", value: 400 },
  { name: "Slack", value: 300 },
  { name: "Okta", value: 300 },
  { name: "Other", value: 200 },
];

const securityEventsData = [
  { name: "Mon", events: 4 },
  { name: "Tue", events: 3 },
  { name: "Wed", events: 2 },
  { name: "Thu", events: 7 },
  { name: "Fri", events: 5 },
  { name: "Sat", events: 1 },
  { name: "Sun", events: 3 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Mock data for recent reports
const recentReports = [
  {
    id: "1",
    name: "User Activity Report",
    runDate: "2023-04-04 08:00",
    status: "Completed",
    favorite: true,
  },
  {
    id: "2",
    name: "License Usage Report",
    runDate: "2023-04-04 09:15",
    status: "Completed",
    favorite: true,
  },
  {
    id: "3",
    name: "Security Audit Report",
    runDate: "2023-04-03 14:30",
    status: "Completed",
    favorite: false,
  },
  {
    id: "4",
    name: "Group Membership Report",
    runDate: "2023-04-02 11:45",
    status: "Completed",
    favorite: false,
  },
];

export function ReportDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>
              Active vs. inactive users over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="active" fill="#4f46e5" name="Active Users" />
                  <Bar dataKey="inactive" fill="#94a3b8" name="Inactive Users" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>License Usage</CardTitle>
            <CardDescription>
              Distribution by service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={licenseUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {licenseUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Security Events</CardTitle>
            <CardDescription>
              Last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={securityEventsData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="events" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Recently generated reports
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{report.name}</span>
                      {report.favorite && (
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {report.runDate}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{report.status}</Badge>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
