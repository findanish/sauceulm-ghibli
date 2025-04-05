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
import { MoreHorizontal, Search, UsersRound } from "lucide-react";

// Mock data for Okta groups
const groups = [
  {
    id: "1",
    name: "Engineering",
    description: "Engineering department",
    type: "Okta Group",
    memberCount: 42,
    applications: ["Jira", "GitHub", "Confluence"],
  },
  {
    id: "2",
    name: "Marketing",
    description: "Marketing department",
    type: "Okta Group",
    memberCount: 18,
    applications: ["Marketo", "HubSpot", "Salesforce"],
  },
  {
    id: "3",
    name: "Sales",
    description: "Sales department",
    type: "Okta Group",
    memberCount: 24,
    applications: ["Salesforce", "Outreach", "Gong"],
  },
  {
    id: "4",
    name: "HR",
    description: "Human Resources department",
    type: "Okta Group",
    memberCount: 8,
    applications: ["Workday", "BambooHR"],
  },
  {
    id: "5",
    name: "Finance",
    description: "Finance department",
    type: "Okta Group",
    memberCount: 12,
    applications: ["NetSuite", "Expensify", "QuickBooks"],
  },
  {
    id: "6",
    name: "All Users",
    description: "All company users",
    type: "Okta Group",
    memberCount: 104,
    applications: ["Google Workspace", "Slack", "Zoom"],
  },
];

export function OktaGroupTable() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
        <Button size="sm">
          <UsersRound className="mr-2 h-4 w-4" />
          Add Group
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>
                  <Badge variant="outline">{group.type}</Badge>
                </TableCell>
                <TableCell>{group.memberCount}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {group.applications.map((app) => (
                      <Badge key={app} variant="secondary">
                        {app}
                      </Badge>
                    ))}
                  </div>
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
                      <DropdownMenuItem>Edit group</DropdownMenuItem>
                      <DropdownMenuItem>Manage members</DropdownMenuItem>
                      <DropdownMenuItem>Assign applications</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Delete group
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
