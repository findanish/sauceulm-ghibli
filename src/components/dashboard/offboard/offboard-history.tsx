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
import { MoreHorizontal, Search, Eye, RotateCcw, CheckCircle2 } from "lucide-react";

// Mock data for offboarding history
const offboardingHistory = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    department: "Engineering",
    lastDay: "2023-04-01",
    status: "Completed",
    initiatedBy: "admin@example.com",
    initiatedOn: "2023-03-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Marketing",
    lastDay: "2023-04-15",
    status: "In Progress",
    initiatedBy: "admin@example.com",
    initiatedOn: "2023-03-30",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "Sales",
    lastDay: "2023-05-01",
    status: "Scheduled",
    initiatedBy: "hr@example.com",
    initiatedOn: "2023-04-01",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    department: "HR",
    lastDay: "2023-03-31",
    status: "Completed",
    initiatedBy: "admin@example.com",
    initiatedOn: "2023-03-15",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    department: "Finance",
    lastDay: "2023-04-30",
    status: "In Progress",
    initiatedBy: "hr@example.com",
    initiatedOn: "2023-04-10",
  },
  {
    id: "6",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    department: "Engineering",
    lastDay: "2023-05-15",
    status: "Scheduled",
    initiatedBy: "admin@example.com",
    initiatedOn: "2023-04-15",
  },
  {
    id: "7",
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    department: "Operations",
    lastDay: "2023-03-15",
    status: "Completed",
    initiatedBy: "hr@example.com",
    initiatedOn: "2023-03-01",
  },
];

export function OffboardHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredHistory = offboardingHistory.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search offboarding records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Last Day</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Initiated By</TableHead>
              <TableHead>Initiated On</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>{record.email}</TableCell>
                <TableCell>{record.department}</TableCell>
                <TableCell>{record.lastDay}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      record.status === "Completed"
                        ? "default"
                        : record.status === "In Progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell>{record.initiatedBy}</TableCell>
                <TableCell>{record.initiatedOn}</TableCell>
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
                      {record.status !== "Completed" && (
                        <>
                          <DropdownMenuItem>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Revert Offboarding
                          </DropdownMenuItem>
                        </>
                      )}
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
