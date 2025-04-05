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
import { MoreHorizontal, Search, Edit, Copy, Trash, Plus } from "lucide-react";

// Mock data for offboarding templates
const templates = [
  {
    id: "1",
    name: "Standard Offboarding",
    description: "Default offboarding process for most employees",
    steps: 12,
    lastModified: "2023-03-15",
    isDefault: true,
  },
  {
    id: "2",
    name: "Immediate Termination",
    description: "Expedited process for immediate terminations",
    steps: 8,
    lastModified: "2023-02-20",
    isDefault: false,
  },
  {
    id: "3",
    name: "Contractor Offboarding",
    description: "Process for offboarding contractors and temporary staff",
    steps: 6,
    lastModified: "2023-01-10",
    isDefault: false,
  },
  {
    id: "4",
    name: "Executive Offboarding",
    description: "Comprehensive process for executive-level employees",
    steps: 18,
    lastModified: "2023-03-05",
    isDefault: false,
  },
  {
    id: "5",
    name: "Remote Employee",
    description: "Specialized process for remote employees",
    steps: 10,
    lastModified: "2023-02-15",
    isDefault: false,
  },
];

export function OffboardTemplates() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Steps</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTemplates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>{template.description}</TableCell>
                <TableCell>{template.steps}</TableCell>
                <TableCell>{template.lastModified}</TableCell>
                <TableCell>
                  {template.isDefault ? (
                    <Badge>Default</Badge>
                  ) : (
                    <Badge variant="outline">Custom</Badge>
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
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Template
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      {!template.isDefault && (
                        <>
                          <DropdownMenuItem>
                            Set as Default
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Template
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
