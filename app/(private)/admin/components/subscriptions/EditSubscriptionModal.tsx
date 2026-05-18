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
import { Edit, Pencil } from "lucide-react";
import { useUpdateSubscriptionsByIdMutation } from "@/redux/features/admin/adminApi";
import { useI18n } from "@/components/provider/I18nProvider";
import { toast } from "sonner";

type FormValues = {
  packageStatus: string;
};

export function EditSubscriptionModal({ id, businessName }: { id: string; businessName: string }) {
  const { locale } = useI18n();
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
     toast.success(locale=="ar"?"تم تحديث الاشتراك بنجاح!":"Subscription updated successfully!");
      setOpen(false);
      form.reset();
    } catch (error) {
      // console.error("Update failed:", error);
      toast.error(locale=="ar"?"فشل التحديث!":"Update failed!");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"

          className="h-10 w-10 rounded-xl text-muted-foreground hover:text-black border hover:bg-white flex items-center justify-center cursor-pointer"
        >
          <Pencil className="h-5 w-5" />
        </button>
      </DialogTrigger>

      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle> {locale=="ar"?"تعديل الاشتراك":"Edit Subscription"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="packageStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> {locale=="ar"?"حالة الاشتراك":"Subscription Status"}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="status" />
                      </SelectTrigger>
                    </FormControl>
                   <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>

                   </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex justify-start gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {/* {isLoading ? "Updating..." : "Save"} */}
                {isLoading ? locale=="ar"?"جارٍ التحديث": "Updating..." : locale=="ar"?"حفظ التغييرات": "Save Changes"}
              </Button>

              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                {locale=="ar"?"إلغاء":"Cancel"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}