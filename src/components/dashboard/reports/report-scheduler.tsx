"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, Search, Plus, Calendar, Clock, Mail, Pause, Play, Edit, Trash } from "lucide-react";

// Mock data for scheduled reports
const scheduledReports = [
  {
    id: "1",
    reportName: "User Activity Report",
    frequency: "Daily",
    nextRun: "2023-04-05 08:00",
    lastRun: "2023-04-04 08:00",
    recipients: ["admin@example.com", "security@example.com"],
    status: "Active",
  },
  {
    id: "2",
    reportName: "License Usage Report",
    frequency: "Weekly",
    nextRun: "2023-04-10 09:00",
    lastRun: "2023-04-03 09:00",
    recipients: ["admin@example.com", "finance@example.com"],
    status: "Active",
  },
  {
    id: "3",
    reportName: "Security Audit Report",
    frequency: "Monthly",
    nextRun: "2023-05-01 07:00",
    lastRun: "2023-04-01 07:00",
    recipients: ["security@example.com"],
    status: "Active",
  },
  {
    id: "4",
    reportName: "Storage Utilization Report",
    frequency: "Weekly",
    nextRun: "2023-04-08 10:00",
    lastRun: "2023-04-01 10:00",
    recipients: ["admin@example.com", "it@example.com"],
    status: "Paused",
  },
  {
    id: "5",
    reportName: "Inactive Users Report",
    frequency: "Monthly",
    nextRun: "2023-05-01 08:30",
    lastRun: "2023-04-01 08:30",
    recipients: ["hr@example.com", "admin@example.com"],
    status: "Active",
  },
];

// Mock data for available reports
const availableReports = [
  { id: "1", name: "User Activity Report" },
  { id: "2", name: "License Usage Report" },
  { id: "3", name: "Security Audit Report" },
  { id: "4", name: "Group Membership Report" },
  { id: "5", name: "Application Usage Report" },
  { id: "6", name: "Storage Utilization Report" },
  { id: "7", name: "Inactive Users Report" },
  { id: "8", name: "Admin Actions Report" },
];

export function ReportScheduler() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [time, setTime] = useState("08:00");
  const [dayOfWeek, setDayOfWeek] = useState("monday");
  const [dayOfMonth, setDayOfMonth] = useState("1");
  const [recipients, setRecipients] = useState("");
  const [exportFormat, setExportFormat] = useState("csv");

  const filteredReports = scheduledReports.filter(
    (report) =>
      report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.frequency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.recipients.some(recipient =>
        recipient.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleScheduleReport = () => {
    // In a real application, this would save the schedule configuration
    console.log({
      reportId: selectedReport,
      frequency,
      time,
      dayOfWeek: frequency === "weekly" ? dayOfWeek : undefined,
      dayOfMonth: frequency === "monthly" ? dayOfMonth : undefined,
      recipients: recipients.split(",").map(email => email.trim()),
      exportFormat,
    });

    // Close dialog and reset form
    setIsDialogOpen(false);
    setSelectedReport("");
    setFrequency("daily");
    setTime("08:00");
    setDayOfWeek("monday");
    setDayOfMonth("1");
    setRecipients("");
    setExportFormat("csv");

    // Show success message
    alert("Report scheduled successfully!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search scheduled reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule a Report</DialogTitle>
              <DialogDescription>
                Configure when and how to run a report automatically.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="report">Report</Label>
                <Select
                  value={selectedReport}
                  onValueChange={setSelectedReport}
                >
                  <SelectTrigger id="report">
                    <SelectValue placeholder="Select a report" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableReports.map((report) => (
                      <SelectItem key={report.id} value={report.id}>
                        {report.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={frequency}
                  onValueChange={setFrequency}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {frequency === "weekly" && (
                <div className="space-y-2">
                  <Label htmlFor="dayOfWeek">Day of Week</Label>
                  <Select
                    value={dayOfWeek}
                    onValueChange={setDayOfWeek}
                  >
                    <SelectTrigger id="dayOfWeek">
                      <SelectValue placeholder="Select day of week" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                      <SelectItem value="saturday">Saturday</SelectItem>
                      <SelectItem value="sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {frequency === "monthly" && (
                <div className="space-y-2">
                  <Label htmlFor="dayOfMonth">Day of Month</Label>
                  <Select
                    value={dayOfMonth}
                    onValueChange={setDayOfMonth}
                  >
                    <SelectTrigger id="dayOfMonth">
                      <SelectValue placeholder="Select day of month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 31 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-[#f0e6c9] border-2 border-[#8b7e57] text-[#5c4c29] font-bold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients (comma-separated)</Label>
                <Input
                  id="recipients"
                  placeholder="email1@example.com, email2@example.com"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exportFormat">Export Format</Label>
                <Select
                  value={exportFormat}
                  onValueChange={setExportFormat}
                >
                  <SelectTrigger id="exportFormat">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleScheduleReport}>
                Schedule Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.reportName}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {report.frequency}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {report.nextRun}
                  </div>
                </TableCell>
                <TableCell>{report.lastRun}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {report.recipients.map((recipient, index) => (
                      <Badge key={index} variant="outline" className="flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {recipient}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={report.status === "Active" ? "default" : "secondary"}
                  >
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Schedule
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" />
                        Run Now
                      </DropdownMenuItem>
                      {report.status === "Active" ? (
                        <DropdownMenuItem>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Schedule
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Resume Schedule
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Schedule
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
