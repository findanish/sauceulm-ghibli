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

// Mock data for Google Workspace groups
const groups = [
  {
    id: "1",
    name: "Engineering",
    email: "engineering@example.com",
    description: "Engineering department",
    type: "Security",
    memberCount: 42,
    createdAt: "2022-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Marketing",
    email: "marketing@example.com",
    description: "Marketing department",
    type: "Security",
    memberCount: 18,
    createdAt: "2022-01-15T10:35:00Z",
  },
  {
    id: "3",
    name: "Sales",
    email: "sales@example.com",
    description: "Sales department",
    type: "Security",
    memberCount: 24,
    createdAt: "2022-01-16T09:15:00Z",
  },
  {
    id: "4",
    name: "HR",
    email: "hr@example.com",
    description: "Human Resources department",
    type: "Security",
    memberCount: 8,
    createdAt: "2022-01-16T11:20:00Z",
  },
  {
    id: "5",
    name: "Finance",
    email: "finance@example.com",
    description: "Finance department",
    type: "Security",
    memberCount: 12,
    createdAt: "2022-01-17T08:10:00Z",
  },
  {
    id: "6",
    name: "Leadership",
    email: "leadership@example.com",
    description: "Company leadership team",
    type: "Security",
    memberCount: 5,
    createdAt: "2022-01-18T14:45:00Z",
  },
  {
    id: "7",
    name: "All Staff",
    email: "all-staff@example.com",
    description: "All company staff",
    type: "Mailing List",
    memberCount: 104,
    createdAt: "2022-01-15T10:25:00Z",
  },
];

export function GoogleGroupTable() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          Create Group
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell>{group.email}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      group.type === "Security" ? "default" : "secondary"
                    }
                  >
                    {group.type}
                  </Badge>
                </TableCell>
                <TableCell>{group.memberCount}</TableCell>
                <TableCell>
                  {new Date(group.createdAt).toLocaleDateString()}
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
                      <DropdownMenuItem>View details</DropdownMenuItem>
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
