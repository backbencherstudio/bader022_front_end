import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/provider/I18nProvider";
import { useGetAutoRenewQuery, useUpdateAutoRenewMutation } from "@/redux/features/merchant/settingApi";
import { toast } from "sonner";

export default function AutoRenew() {
  const { locale } = useI18n();
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);

  // API Hooks
  const { data, isLoading: isFetching } = useGetAutoRenewQuery({});
  const [updateAutoRenew, { isLoading: isUpdating }] = useUpdateAutoRenewMutation();

  // Initialize toggle from API response
  useEffect(() => {
    const val = data?.data?.auto_renew;
    if (typeof val !== "undefined") {
      setEnabled(Number(val) === 1);
    }
  }, [data]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateAutoRenew({ body: { auto_renew: enabled ? 1 : 0 } }).unwrap();
      toast.success(locale === "ar" ? "تم تحديث حالة التجديد" : "Auto renew updated");
    } catch (err: any) {
      toast.error(locale === "ar" ? "فشل التحديث" : "Failed to update");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto p-4">
      <div className="p-5 border rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          {locale === "ar" ? "التجديد التلقائي" : "Auto Renew"}
        </h2>

        <p className="mb-4 text-sm text-muted-foreground">
          {locale === "ar"
            ? "قم بتشغيل أو إيقاف ميزة التجديد التلقائي للاشتراكات."
            : "Enable or disable automatic renewal for subscriptions."}
        </p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">{locale === "ar" ? "التجديد التلقائي" : "Auto Renew"}</p>
            <p className="text-sm text-muted-foreground">
              {locale === "ar"
                ? "عند التفعيل، سيتم تجديد الاشتراكات تلقائيًا عند انتهاء صلاحيتها."
                : "When enabled, subscriptions will automatically renew at expiry."}
            </p>
          </div>

            <div className="flex items-center gap-4">
              <Switch
                checked={enabled}
                onCheckedChange={(val) => setEnabled(Boolean(val))}
                disabled={isFetching || isUpdating}
              />
              <Button className="ml-2" onClick={handleSave} disabled={isSaving || isFetching || isUpdating}>
                {isSaving || isUpdating ? (locale === "ar" ? "جاري الحفظ..." : "Saving...") : (locale === "ar" ? "حفظ" : "Save")}
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
