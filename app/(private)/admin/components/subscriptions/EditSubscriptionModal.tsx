"use client";

import { useForm } from "react-hook-form";

import {
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

export function EditSubscriptionModal() {
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
        <DialogTitle>Edit Subscription</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Package Status */}
          <FormField
            control={form.control}
            name="packageStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription Status</FormLabel>
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

          {/* Actions */}
          <div className="flex justify-start gap-4 pt-4">
            <Button type="submit">Save</Button>
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
