"use client";
import { useState } from "react";
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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit } from "lucide-react";
import { useUpdateSubscriptionsByIdMutation } from "@/redux/features/admin/adminApi";

type FormValues = {
  packageStatus: string;
};

export function EditSubscriptionModal({ id, businessName }: { id: string; businessName: string }) {
  const [open, setOpen] = useState(false);
  const [updateSubscription, { isLoading }] = useUpdateSubscriptionsByIdMutation();

  const form = useForm<FormValues>({
    defaultValues: { packageStatus: "active" },
  });

  async function onSubmit(values: FormValues) {
    try {
      await updateSubscription({
        id,
        data: { status: values.packageStatus },
      }).unwrap();

      setOpen(false); // 🔥 close modal
      form.reset();
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="h-5 w-5 cursor-pointer mt-2" />
      </DialogTrigger>

      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit Subscription</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="packageStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex justify-start gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Save"}
              </Button>

              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}