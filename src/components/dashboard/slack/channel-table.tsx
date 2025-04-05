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
import { MoreHorizontal, Search, Hash } from "lucide-react";

// Mock data for Slack channels
const channels = [
  {
    id: "1",
    name: "general",
    description: "Company-wide announcements and work-based matters",
    type: "Public",
    memberCount: 104,
    createdAt: "2022-01-15T10:30:00Z",
    createdBy: "Charlie Brown",
  },
  {
    id: "2",
    name: "random",
    description: "Non-work banter and water cooler conversation",
    type: "Public",
    memberCount: 98,
    createdAt: "2022-01-15T10:35:00Z",
    createdBy: "Charlie Brown",
  },
  {
    id: "3",
    name: "engineering",
    description: "Engineering team discussions",
    type: "Public",
    memberCount: 42,
    createdAt: "2022-01-16T09:15:00Z",
    createdBy: "John Doe",
  },
  {
    id: "4",
    name: "marketing",
    description: "Marketing team discussions",
    type: "Public",
    memberCount: 18,
    createdAt: "2022-01-16T11:20:00Z",
    createdBy: "Jane Smith",
  },
  {
    id: "5",
    name: "sales",
    description: "Sales team discussions",
    type: "Public",
    memberCount: 24,
    createdAt: "2022-01-17T08:10:00Z",
    createdBy: "Bob Johnson",
  },
  {
    id: "6",
    name: "leadership",
    description: "Leadership team discussions",
    type: "Private",
    memberCount: 5,
    createdAt: "2022-01-18T14:45:00Z",
    createdBy: "Charlie Brown",
  },
];

export function SlackChannelTable() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredChannels = channels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
        <Button size="sm">
          <Hash className="mr-2 h-4 w-4" />
          Create Channel
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
              <TableHead>Created</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChannels.map((channel) => (
              <TableRow key={channel.id}>
                <TableCell className="font-medium">#{channel.name}</TableCell>
                <TableCell>{channel.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      channel.type === "Public" ? "default" : "secondary"
                    }
                  >
                    {channel.type}
                  </Badge>
                </TableCell>
                <TableCell>{channel.memberCount}</TableCell>
                <TableCell>
                  {new Date(channel.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{channel.createdBy}</TableCell>
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
                      <DropdownMenuItem>Edit channel</DropdownMenuItem>
                      <DropdownMenuItem>Manage members</DropdownMenuItem>
                      <DropdownMenuItem>View channel details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Archive channel
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
