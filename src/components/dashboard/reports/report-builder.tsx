"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Save, Play, Download } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Report name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  dataSource: z.string().min(1, {
    message: "Please select a data source.",
  }),
  fields: z.array(z.string()).min(1, {
    message: "Please select at least one field.",
  }),
  filters: z.array(
    z.object({
      field: z.string(),
      operator: z.string(),
      value: z.string(),
    })
  ).optional(),
  sortBy: z.string().optional(),
  sortDirection: z.string().optional(),
  limit: z.string().optional(),
  format: z.string().min(1, {
    message: "Please select an export format.",
  }),
});

// Available fields for each data source
const dataSourceFields = {
  users: [
    "id", "name", "email", "department", "title", "manager", "status", 
    "createdAt", "lastLogin", "groups", "licenses"
  ],
  groups: [
    "id", "name", "description", "type", "memberCount", "createdAt", 
    "lastModified", "owners"
  ],
  applications: [
    "id", "name", "description", "status", "userCount", "lastUpdated", 
    "type", "owner"
  ],
  audit: [
    "id", "timestamp", "service", "event", "user", "ip", "details", "severity"
  ],
};

export function ReportBuilder() {
  const [selectedDataSource, setSelectedDataSource] = useState<string | null>(null);
  const [filters, setFilters] = useState<Array<{ field: string; operator: string; value: string }>>([]);
  
  // Define form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      dataSource: "",
      fields: [],
      filters: [],
      sortBy: "",
      sortDirection: "asc",
      limit: "1000",
      format: "csv",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, this would save the report configuration
    console.log(values);
    // Show success message or redirect to the report
    alert("Report created successfully!");
  }
  
  const handleDataSourceChange = (value: string) => {
    setSelectedDataSource(value);
    form.setValue("dataSource", value);
    form.setValue("fields", []);
  };
  
  const addFilter = () => {
    if (!selectedDataSource) return;
    
    setFilters([
      ...filters,
      { field: "", operator: "equals", value: "" },
    ]);
  };
  
  const removeFilter = (index: number) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };
  
  const updateFilter = (index: number, field: string, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [field]: value };
    setFilters(newFilters);
    form.setValue("filters", newFilters);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Report Details</h3>
          <Separator />
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Custom Report" {...field} />
                </FormControl>
                <FormDescription>
                  A descriptive name for your report.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the purpose of this report"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user_management">User Management</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="licensing">Licensing</SelectItem>
                    <SelectItem value="applications">Applications</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Configuration</h3>
          <Separator />
          
          <FormField
            control={form.control}
            name="dataSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Source</FormLabel>
                <Select 
                  onValueChange={(value) => handleDataSourceChange(value)} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="users">Users</SelectItem>
                    <SelectItem value="groups">Groups</SelectItem>
                    <SelectItem value="applications">Applications</SelectItem>
                    <SelectItem value="audit">Audit Logs</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The primary data source for this report.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {selectedDataSource && (
            <FormField
              control={form.control}
              name="fields"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Fields</FormLabel>
                    <FormDescription>
                      Select the fields to include in your report.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {dataSourceFields[selectedDataSource as keyof typeof dataSourceFields].map((field) => (
                      <FormField
                        key={field}
                        control={form.control}
                        name="fields"
                        render={({ field: { onChange, value } }) => {
                          return (
                            <FormItem
                              key={field}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={value?.includes(field)}
                                  onCheckedChange={(checked) => {
                                    const updatedFields = checked
                                      ? [...value, field]
                                      : value?.filter(
                                          (val) => val !== field
                                        );
                                    onChange(updatedFields);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {field}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Filters</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFilter}
              disabled={!selectedDataSource}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Filter
            </Button>
          </div>
          <Separator />
          
          {filters.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No filters added. Click "Add Filter" to create one.
            </div>
          ) : (
            <div className="space-y-4">
              {filters.map((filter, index) => (
                <div key={index} className="flex items-end gap-2 border p-4 rounded-md">
                  <div className="flex-1">
                    <Label>Field</Label>
                    <Select
                      value={filter.field}
                      onValueChange={(value) => updateFilter(index, "field", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedDataSource && dataSourceFields[selectedDataSource as keyof typeof dataSourceFields].map((field) => (
                          <SelectItem key={field} value={field}>
                            {field}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <Label>Operator</Label>
                    <Select
                      value={filter.operator}
                      onValueChange={(value) => updateFilter(index, "operator", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="not_equals">Not Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="starts_with">Starts With</SelectItem>
                        <SelectItem value="ends_with">Ends With</SelectItem>
                        <SelectItem value="greater_than">Greater Than</SelectItem>
                        <SelectItem value="less_than">Less Than</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <Label>Value</Label>
                    <Input
                      value={filter.value}
                      onChange={(e) => updateFilter(index, "value", e.target.value)}
                      placeholder="Filter value"
                    />
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFilter(index)}
                    className="text-destructive"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="advanced">
            <AccordionTrigger>Advanced Options</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sortBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort By</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select field to sort by" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">No Sorting</SelectItem>
                            {selectedDataSource && dataSourceFields[selectedDataSource as keyof typeof dataSourceFields].map((field) => (
                              <SelectItem key={field} value={field}>
                                {field}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sortDirection"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort Direction</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sort direction" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="asc">Ascending</SelectItem>
                            <SelectItem value="desc">Descending</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Result Limit</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="10000" {...field} />
                      </FormControl>
                      <FormDescription>
                        Maximum number of records to return (1-10,000).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Export Format</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select export format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Report
          </Button>
          <Button type="button" variant="default">
            <Play className="mr-2 h-4 w-4" />
            Run Report
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Helper component for labels
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-medium mb-1.5">{children}</div>
  );
}
