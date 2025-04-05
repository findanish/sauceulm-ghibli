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
import { MoreHorizontal, Search, Play, Download, Clock, Star, StarOff } from "lucide-react";

// Mock data for reports
const reports = [
  {
    id: "1",
    name: "User Activity Report",
    description: "Detailed user activity across all services",
    category: "User Management",
    lastRun: "2023-04-01",
    scheduled: true,
    favorite: true,
  },
  {
    id: "2",
    name: "License Usage Report",
    description: "Overview of license utilization",
    category: "Licensing",
    lastRun: "2023-04-02",
    scheduled: true,
    favorite: true,
  },
  {
    id: "3",
    name: "Security Audit Report",
    description: "Security events and potential issues",
    category: "Security",
    lastRun: "2023-03-15",
    scheduled: true,
    favorite: false,
  },
  {
    id: "4",
    name: "Group Membership Report",
    description: "List of all groups and their members",
    category: "User Management",
    lastRun: "2023-03-20",
    scheduled: false,
    favorite: false,
  },
  {
    id: "5",
    name: "Application Usage Report",
    description: "Usage statistics for all applications",
    category: "Applications",
    lastRun: "2023-03-25",
    scheduled: false,
    favorite: true,
  },
  {
    id: "6",
    name: "Storage Utilization Report",
    description: "Storage usage across Google Drive",
    category: "Storage",
    lastRun: "2023-03-28",
    scheduled: true,
    favorite: false,
  },
  {
    id: "7",
    name: "Inactive Users Report",
    description: "Users with no recent activity",
    category: "User Management",
    lastRun: "2023-03-30",
    scheduled: true,
    favorite: false,
  },
  {
    id: "8",
    name: "Admin Actions Report",
    description: "All administrative actions taken",
    category: "Administration",
    lastRun: "2023-04-01",
    scheduled: false,
    favorite: false,
  },
];

export function ReportsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(
    reports.reduce((acc, report) => {
      acc[report.id] = report.favorite;
      return acc;
    }, {} as Record<string, boolean>)
  );
  
  const toggleFavorite = (id: string) => {
    setFavorites({
      ...favorites,
      [id]: !favorites[id],
    });
  };
  
  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
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
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(report.id)}
                  >
                    {favorites[report.id] ? (
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <StarOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>
                  <Badge variant="outline">{report.category}</Badge>
                </TableCell>
                <TableCell>{report.lastRun}</TableCell>
                <TableCell>
                  {report.scheduled ? (
                    <Badge variant="secondary">
                      <Clock className="mr-1 h-3 w-3" />
                      Scheduled
                    </Badge>
                  ) : (
                    <Badge variant="outline">On-demand</Badge>
                  )}
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
                        <Play className="mr-2 h-4 w-4" />
                        Run Now
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download Last Run
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="mr-2 h-4 w-4" />
                        Schedule
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => toggleFavorite(report.id)}>
                        {favorites[report.id] ? (
                          <>
                            <StarOff className="mr-2 h-4 w-4" />
                            Remove from Favorites
                          </>
                        ) : (
                          <>
                            <Star className="mr-2 h-4 w-4" />
                            Add to Favorites
                          </>
                        )}
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
