"use client";

import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormValues = {
  packageStatus: string;
  platformStatus: string;
  platformAccess: string;
};

export function EditProfileDialog() {
  const form = useForm<FormValues>({
    defaultValues: {
      packageStatus: "active",
      platformStatus: "live",
      platformAccess: "enabled",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    // call API here
  }

  return (
    <DialogContent className="rounded-xl">
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Package Status */}
          <FormField
            control={form.control}
            name="packageStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Status</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Platform Status */}
          <FormField
            control={form.control}
            name="platformStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform Status</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Platform Access */}
          <FormField
            control={form.control}
            name="platformAccess"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform Access</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select access" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="enabled">Enabled</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex justify-start gap-4 pt-4">
            <Button type="submit">Save Profile</Button>
            <DialogTrigger asChild>
              <Button
                className="cursor-pointer"
                variant="outline"
                type="button"
              >
                Cancel
              </Button>
            </DialogTrigger>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
