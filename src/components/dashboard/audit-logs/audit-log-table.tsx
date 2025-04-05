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
import { MoreHorizontal, Search, Download, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Mock data for audit logs
const generateMockLogs = (service: string) => {
  const allLogs = [
    {
      id: "1",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      service: "Okta",
      event: "User Login",
      user: "john.doe@example.com",
      ip: "192.168.1.1",
      details: "Successful login from Chrome on Windows",
      severity: "Info",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      service: "Okta",
      event: "Password Reset",
      user: "jane.smith@example.com",
      ip: "192.168.1.2",
      details: "Password reset initiated by admin",
      severity: "Info",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      service: "Slack",
      event: "Channel Created",
      user: "admin@example.com",
      ip: "192.168.1.3",
      details: "Created #project-alpha channel",
      severity: "Info",
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      service: "Google",
      event: "Permission Change",
      user: "admin@example.com",
      ip: "192.168.1.4",
      details: "Changed permissions on shared drive 'Marketing'",
      severity: "Warning",
    },
    {
      id: "5",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      service: "System",
      event: "API Key Created",
      user: "system@example.com",
      ip: "192.168.1.5",
      details: "New API key generated for Slack integration",
      severity: "Info",
    },
    {
      id: "6",
      timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
      service: "Okta",
      event: "Group Membership",
      user: "admin@example.com",
      ip: "192.168.1.6",
      details: "Added user bob.johnson@example.com to 'Engineering' group",
      severity: "Info",
    },
    {
      id: "7",
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      service: "Google",
      event: "Account Suspended",
      user: "admin@example.com",
      ip: "192.168.1.7",
      details: "Suspended account for former.employee@example.com",
      severity: "Warning",
    },
    {
      id: "8",
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      service: "Slack",
      event: "Integration Added",
      user: "admin@example.com",
      ip: "192.168.1.8",
      details: "Added Google Drive integration to Slack",
      severity: "Info",
    },
    {
      id: "9",
      timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      service: "System",
      event: "Backup Completed",
      user: "system@example.com",
      ip: "192.168.1.9",
      details: "Automated backup completed successfully",
      severity: "Info",
    },
    {
      id: "10",
      timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
      service: "Okta",
      event: "Failed Login",
      user: "alice.williams@example.com",
      ip: "192.168.1.10",
      details: "Multiple failed login attempts",
      severity: "Error",
    },
    {
      id: "11",
      timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
      service: "Google",
      event: "File Access",
      user: "bob.johnson@example.com",
      ip: "192.168.1.11",
      details: "Accessed sensitive financial document",
      severity: "Warning",
    },
    {
      id: "12",
      timestamp: new Date(Date.now() - 1000 * 60 * 420), // 7 hours ago
      service: "Slack",
      event: "Data Export",
      user: "admin@example.com",
      ip: "192.168.1.12",
      details: "Exported all channel data",
      severity: "Warning",
    },
  ];

  if (service === "all") {
    return allLogs;
  }
  
  return allLogs.filter(log => 
    log.service.toLowerCase() === service.toLowerCase()
  );
};

export function AuditLogTable({ service }: { service: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const logs = generateMockLogs(service);
  
  const filteredLogs = logs.filter(
    (log) =>
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
        <Button size="sm" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>User</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="whitespace-nowrap">
                  {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      log.service === "Okta"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : log.service === "Slack"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : log.service === "Google"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }
                  >
                    {log.service}
                  </Badge>
                </TableCell>
                <TableCell>{log.event}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.ip}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      log.severity === "Error"
                        ? "destructive"
                        : log.severity === "Warning"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {log.severity}
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
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Export
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
