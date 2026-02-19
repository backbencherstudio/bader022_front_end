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
import { useUpdateMerchantByIdMutation } from "@/redux/features/admin/adminApi";
import { toast } from "sonner";

type FormValues = {
  status: string;
  platform_status: string;
  platform_access: string;
};

export function EditProfileDialog({ id }: any) {
  const form = useForm<FormValues>({
    defaultValues: {
      status: "active",
      platform_status: "live",
      platform_access: "enabled",
    },
  });

  const [updateMerchantById] = useUpdateMerchantByIdMutation(id);

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await updateMerchantById({ id, values });
      console.log(response);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

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
            name="status"
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
            name="platform_status"
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
            name="platform_access"
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
            <Button type="submit" className="cursor-pointer">
              Save Profile
            </Button>
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
