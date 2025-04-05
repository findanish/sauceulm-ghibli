"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  ShieldAlert,
  TrendingUp,
  TrendingDown
} from "lucide-react";

export function AuditLogStats() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <Info className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,284</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500">+12%</span>
            <span className="ml-1">from last week</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Warning Events</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500">-8%</span>
            <span className="ml-1">from last week</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Error Events</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
            <span className="text-red-500">+2</span>
            <span className="ml-1">from last week</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
