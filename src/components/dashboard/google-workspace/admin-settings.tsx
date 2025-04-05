"use client";

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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const securityFormSchema = z.object({
  enforcePasswordPolicy: z.boolean().default(true),
  passwordLength: z.string().min(1, {
    message: "Password length is required.",
  }),
  passwordComplexity: z.string().min(1, {
    message: "Password complexity is required.",
  }),
  passwordExpiryDays: z.string().min(1, {
    message: "Password expiry is required.",
  }),
  enforceMFA: z.boolean().default(true),
  allowedMFAMethods: z.array(z.string()).min(1, {
    message: "At least one MFA method must be selected.",
  }),
  sessionTimeout: z.string().min(1, {
    message: "Session timeout is required.",
  }),
});

const deviceFormSchema = z.object({
  allowMobileDevices: z.boolean().default(true),
  requireDeviceApproval: z.boolean().default(true),
  allowPersonalDevices: z.boolean().default(true),
  enforceScreenLock: z.boolean().default(true),
  allowDataSync: z.boolean().default(true),
  allowedDeviceTypes: z.array(z.string()).min(1, {
    message: "At least one device type must be selected.",
  }),
});

const complianceFormSchema = z.object({
  enableAuditLogs: z.boolean().default(true),
  auditLogRetention: z.string().min(1, {
    message: "Audit log retention is required.",
  }),
  enableAlerts: z.boolean().default(true),
  enableRuleBasedAlerts: z.boolean().default(true),
  enableAnomalyDetection: z.boolean().default(true),
  complianceMode: z.string().min(1, {
    message: "Compliance mode is required.",
  }),
});

export function GoogleAdminSettings() {
  // Define security form with default values
  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      enforcePasswordPolicy: true,
      passwordLength: "8",
      passwordComplexity: "medium",
      passwordExpiryDays: "90",
      enforceMFA: true,
      allowedMFAMethods: ["app", "sms", "security_key"],
      sessionTimeout: "12",
    },
  });

  // Define device form with default values
  const deviceForm = useForm<z.infer<typeof deviceFormSchema>>({
    resolver: zodResolver(deviceFormSchema),
    defaultValues: {
      allowMobileDevices: true,
      requireDeviceApproval: true,
      allowPersonalDevices: true,
      enforceScreenLock: true,
      allowDataSync: true,
      allowedDeviceTypes: ["android", "ios", "windows", "macos", "chrome_os"],
    },
  });

  // Define compliance form with default values
  const complianceForm = useForm<z.infer<typeof complianceFormSchema>>({
    resolver: zodResolver(complianceFormSchema),
    defaultValues: {
      enableAuditLogs: true,
      auditLogRetention: "365",
      enableAlerts: true,
      enableRuleBasedAlerts: true,
      enableAnomalyDetection: true,
      complianceMode: "standard",
    },
  });

  function onSecuritySubmit(values: z.infer<typeof securityFormSchema>) {
    console.log(values);
  }

  function onDeviceSubmit(values: z.infer<typeof deviceFormSchema>) {
    console.log(values);
  }

  function onComplianceSubmit(values: z.infer<typeof complianceFormSchema>) {
    console.log(values);
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="security" className="mt-4 space-y-4">
          <Form {...securityForm}>
            <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password Policy</h3>
                    <Separator />
                    
                    <FormField
                      control={securityForm.control}
                      name="enforcePasswordPolicy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enforce Password Policy
                            </FormLabel>
                            <FormDescription>
                              Enforce password requirements for all users.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="passwordLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Password Length</FormLabel>
                          <FormControl>
                            <Input type="number" min="6" max="100" {...field} />
                          </FormControl>
                          <FormDescription>
                            Minimum number of characters required for passwords.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="passwordComplexity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password Complexity</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select complexity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low - Letters only</SelectItem>
                              <SelectItem value="medium">Medium - Letters and numbers</SelectItem>
                              <SelectItem value="high">High - Letters, numbers, and symbols</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Required complexity level for passwords.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="passwordExpiryDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password Expiry (days)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" max="365" {...field} />
                          </FormControl>
                          <FormDescription>
                            Number of days before passwords expire. Set to 0 for no expiry.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Multi-Factor Authentication</h3>
                    <Separator />
                    
                    <FormField
                      control={securityForm.control}
                      name="enforceMFA"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enforce MFA
                            </FormLabel>
                            <FormDescription>
                              Require multi-factor authentication for all users.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="sessionTimeout"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Session Timeout (hours)</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" max="720" {...field} />
                          </FormControl>
                          <FormDescription>
                            Number of hours before user sessions expire.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button type="submit">Save Security Settings</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="devices" className="mt-4 space-y-4">
          <Form {...deviceForm}>
            <form onSubmit={deviceForm.handleSubmit(onDeviceSubmit)} className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Device Management</h3>
                    <Separator />
                    
                    <FormField
                      control={deviceForm.control}
                      name="allowMobileDevices"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Allow Mobile Devices
                            </FormLabel>
                            <FormDescription>
                              Allow users to access Google Workspace from mobile devices.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={deviceForm.control}
                      name="requireDeviceApproval"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Require Device Approval
                            </FormLabel>
                            <FormDescription>
                              Require admin approval before new devices can access Google Workspace.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={deviceForm.control}
                      name="allowPersonalDevices"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Allow Personal Devices
                            </FormLabel>
                            <FormDescription>
                              Allow users to access Google Workspace from personal devices.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={deviceForm.control}
                      name="enforceScreenLock"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enforce Screen Lock
                            </FormLabel>
                            <FormDescription>
                              Require screen lock on devices accessing Google Workspace.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={deviceForm.control}
                      name="allowDataSync"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Allow Data Sync
                            </FormLabel>
                            <FormDescription>
                              Allow data synchronization between devices.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button type="submit">Save Device Settings</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="compliance" className="mt-4 space-y-4">
          <Form {...complianceForm}>
            <form onSubmit={complianceForm.handleSubmit(onComplianceSubmit)} className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Audit and Compliance</h3>
                    <Separator />
                    
                    <FormField
                      control={complianceForm.control}
                      name="enableAuditLogs"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enable Audit Logs
                            </FormLabel>
                            <FormDescription>
                              Record detailed logs of user and admin activities.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={complianceForm.control}
                      name="auditLogRetention"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Audit Log Retention (days)</FormLabel>
                          <FormControl>
                            <Input type="number" min="30" max="3650" {...field} />
                          </FormControl>
                          <FormDescription>
                            Number of days to retain audit logs.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={complianceForm.control}
                      name="enableAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enable Security Alerts
                            </FormLabel>
                            <FormDescription>
                              Send alerts for suspicious activities.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={complianceForm.control}
                      name="enableRuleBasedAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enable Rule-Based Alerts
                            </FormLabel>
                            <FormDescription>
                              Configure custom rules for security alerts.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={complianceForm.control}
                      name="enableAnomalyDetection"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enable Anomaly Detection
                            </FormLabel>
                            <FormDescription>
                              Use AI to detect unusual patterns and potential security threats.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={complianceForm.control}
                      name="complianceMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Compliance Mode</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select compliance mode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="high">High Security</SelectItem>
                              <SelectItem value="government">Government</SelectItem>
                              <SelectItem value="financial">Financial</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Compliance mode determines the security and compliance settings.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button type="submit">Save Compliance Settings</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
