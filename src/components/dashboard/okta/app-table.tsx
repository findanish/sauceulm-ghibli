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
import { MoreHorizontal, Search, AppWindow } from "lucide-react";

// Mock data for Okta applications
const applications = [
  {
    id: "1",
    name: "Slack",
    description: "Team communication platform",
    status: "Active",
    userCount: 104,
    lastUpdated: "2023-04-01T10:30:00Z",
    type: "SAML 2.0",
  },
  {
    id: "2",
    name: "Google Workspace",
    description: "Productivity and collaboration tools",
    status: "Active",
    userCount: 104,
    lastUpdated: "2023-04-02T09:15:00Z",
    type: "SAML 2.0",
  },
  {
    id: "3",
    name: "Salesforce",
    description: "CRM platform",
    status: "Active",
    userCount: 42,
    lastUpdated: "2023-03-15T14:45:00Z",
    type: "SAML 2.0",
  },
  {
    id: "4",
    name: "Jira",
    description: "Issue tracking software",
    status: "Active",
    userCount: 42,
    lastUpdated: "2023-04-03T11:20:00Z",
    type: "SAML 2.0",
  },
  {
    id: "5",
    name: "Confluence",
    description: "Team collaboration software",
    status: "Active",
    userCount: 42,
    lastUpdated: "2023-03-20T08:10:00Z",
    type: "SAML 2.0",
  },
  {
    id: "6",
    name: "Zoom",
    description: "Video conferencing platform",
    status: "Active",
    userCount: 104,
    lastUpdated: "2023-03-25T13:40:00Z",
    type: "SAML 2.0",
  },
  {
    id: "7",
    name: "GitHub",
    description: "Code hosting platform",
    status: "Active",
    userCount: 42,
    lastUpdated: "2023-03-28T15:30:00Z",
    type: "SAML 2.0",
  },
];

export function OktaAppTable() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredApps = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
        <Button size="sm">
          <AppWindow className="mr-2 h-4 w-4" />
          Add Application
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApps.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell>{app.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={app.status === "Active" ? "default" : "secondary"}
                  >
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell>{app.userCount}</TableCell>
                <TableCell>
                  {new Date(app.lastUpdated).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{app.type}</Badge>
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
                      <DropdownMenuItem>Edit application</DropdownMenuItem>
                      <DropdownMenuItem>Assign to users</DropdownMenuItem>
                      <DropdownMenuItem>Assign to groups</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Deactivate application
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
