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

const formSchema = z.object({
  defaultDriveStorage: z.string().min(1, {
    message: "Default storage is required.",
  }),
  allowExternalSharing: z.boolean().default(true),
  allowPublicSharing: z.boolean().default(false),
  allowOfflineDocs: z.boolean().default(true),
  defaultVisibility: z.string().min(1, {
    message: "Default visibility is required.",
  }),
  retentionPeriod: z.string().min(1, {
    message: "Retention period is required.",
  }),
  enableDLP: z.boolean().default(true),
});

export function GoogleDriveSettings() {
  // Define form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      defaultDriveStorage: "15",
      allowExternalSharing: true,
      allowPublicSharing: false,
      allowOfflineDocs: true,
      defaultVisibility: "private",
      retentionPeriod: "30",
      enableDLP: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, this would save the settings to the backend
    console.log(values);
    // Show success message or handle errors
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Storage Settings</h3>
                <Separator />
                
                <FormField
                  control={form.control}
                  name="defaultDriveStorage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Drive Storage (GB)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Default storage allocation for new users in GB.
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
                <h3 className="text-lg font-medium">Sharing Settings</h3>
                <Separator />
                
                <FormField
                  control={form.control}
                  name="allowExternalSharing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Allow External Sharing
                        </FormLabel>
                        <FormDescription>
                          Allow users to share files with people outside the organization.
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
                  control={form.control}
                  name="allowPublicSharing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Allow Public Sharing
                        </FormLabel>
                        <FormDescription>
                          Allow users to create public links to files.
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
                  control={form.control}
                  name="defaultVisibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default File Visibility</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select default visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="organization">Organization</SelectItem>
                          <SelectItem value="anyone_with_link">Anyone with link</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Default visibility setting for new files.
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
                <h3 className="text-lg font-medium">Access Settings</h3>
                <Separator />
                
                <FormField
                  control={form.control}
                  name="allowOfflineDocs"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Allow Offline Access
                        </FormLabel>
                        <FormDescription>
                          Allow users to access documents offline.
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
                  control={form.control}
                  name="enableDLP"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Enable Data Loss Prevention
                        </FormLabel>
                        <FormDescription>
                          Scan files for sensitive information and apply DLP policies.
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
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Retention</h3>
                <Separator />
                
                <FormField
                  control={form.control}
                  name="retentionPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Retention Period for Deleted Files (days)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Number of days to keep deleted files before permanent deletion.
                        Set to 0 for immediate permanent deletion.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
