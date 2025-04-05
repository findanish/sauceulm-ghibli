"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterX, Search } from "lucide-react";
import { format } from "date-fns";

export function AuditLogFilters() {
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="service">Service</Label>
          <Select defaultValue="all">
            <SelectTrigger id="service">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="okta">Okta</SelectItem>
              <SelectItem value="slack">Slack</SelectItem>
              <SelectItem value="google">Google Workspace</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="event-type">Event Type</Label>
          <Select defaultValue="all">
            <SelectTrigger id="event-type">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="login">Login Events</SelectItem>
              <SelectItem value="user">User Management</SelectItem>
              <SelectItem value="group">Group Management</SelectItem>
              <SelectItem value="permission">Permission Changes</SelectItem>
              <SelectItem value="data">Data Access</SelectItem>
              <SelectItem value="system">System Events</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="severity">Severity</Label>
          <Select defaultValue="all">
            <SelectTrigger id="severity">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="user">User</Label>
          <Input id="user" placeholder="Filter by user" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date (MM-DD-YYYY)</Label>
          <Input
            id="start-date"
            type="text"
            placeholder="MM-DD-YYYY"
            value={startDate ? format(startDate, "MM-dd-yyyy") : ""}
            onChange={(e) => {
              const datePattern = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-(\d{4})$/;
              if (datePattern.test(e.target.value)) {
                const [month, day, year] = e.target.value.split("-").map(Number);
                const date = new Date(year, month - 1, day);
                if (!isNaN(date.getTime())) {
                  setStartDate(date);
                }
              }
            }}
            className="font-bold bg-[#f0e6c9] border-2 border-[#8b7e57] text-[#5c4c29]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end-date">End Date (MM-DD-YYYY)</Label>
          <Input
            id="end-date"
            type="text"
            placeholder="MM-DD-YYYY"
            value={endDate ? format(endDate, "MM-dd-yyyy") : ""}
            onChange={(e) => {
              const datePattern = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-(\d{4})$/;
              if (datePattern.test(e.target.value)) {
                const [month, day, year] = e.target.value.split("-").map(Number);
                const date = new Date(year, month - 1, day);
                if (!isNaN(date.getTime())) {
                  setEndDate(date);
                }
              }
            }}
            className="font-bold bg-[#f0e6c9] border-2 border-[#8b7e57] text-[#5c4c29]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ip-address">IP Address</Label>
          <Input id="ip-address" placeholder="Filter by IP address" />
        </div>

        <div className="space-y-2">
          <Label>Quick Filters</Label>
          <Select defaultValue="last7days">
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="thismonth">This Month</SelectItem>
              <SelectItem value="lastmonth">Last Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="failed-only" />
        <label
          htmlFor="failed-only"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show failed events only
        </label>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" size="sm">
          <FilterX className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
        <Button size="sm">
          <Search className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
