"use client";

import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
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

import { useUpdateMerchantByIdMutation } from "@/redux/features/admin/adminApi";
import { toast } from "sonner";

type FormValues = {
  status: string;
  platform_status: string;
  platform_access: string;
};

export function EditProfileDialog({ id, onClose }: any) {
  const form = useForm<FormValues>({
    defaultValues: {
      status: "active",
      platform_status: "1",
      platform_access: "1",
    },
  });

  const [updateMerchantById, { isLoading }] =
    useUpdateMerchantByIdMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await updateMerchantById({
        id,
        data: values,
      }).unwrap();

      toast.success(response.message || "Updated successfully");

      onClose(); 
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  return (
    <DialogContent className="rounded-xl">
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Package Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Status</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
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

          {/* Platform Status */}
          <FormField
            control={form.control}
            name="platform_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform Status</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="platform_status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Live</SelectItem>
                    <SelectItem value="0">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Platform Access */}
          <FormField
            control={form.control}
            name="platform_access"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Platform Access</FormLabel>
                <Select 
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="platform_access" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Enabled</SelectItem>
                    <SelectItem value="0">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}