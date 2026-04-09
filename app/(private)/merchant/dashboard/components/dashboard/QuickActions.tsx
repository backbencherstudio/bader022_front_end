"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/components/provider/I18nProvider";

export type QuickActionItem = {
  id: string;
  label: any;
  url?: string;
  onClick?: () => void;
};

function ActionTile({ item }: { item: QuickActionItem }) {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const content = (
    <Card
      className={[
        "h-24 w-full rounded-2xl bg-background shadow-sm",
        "dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        "transition-all duration-150",
        "group-hover:-translate-y-1 group-hover:shadow-md",
      ].join(" ")}
    >
      <div className="flex h-full flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-medium leading-snug text-foreground whitespace-pre-line">
          {item.label}
        </p>

        <ChevronRight className="mt-3 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
    </Card>
  );

  // If URL exists → use Next.js Link
  if (item.url) {
    return (
      <Link href={item.url} className="group block w-full">
        {content}
      </Link>
    );
  }

  // Otherwise fallback to button
  return (
    <button
      type="button"
      onClick={item.onClick}
      className="group w-full text-left"
    >
      {content}
    </button>
  );
}

export function QuickActions({
  items,
  className,
}: {
  title?: string;
  items: QuickActionItem[];
  className?: string;
}) {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold">
        {locale === "ar" ? "الإجراءات السريعة" : "Quick Actions"}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {items.slice(0, 4).map((item) => (
          <ActionTile key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function QuickActionsComponents() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const actions: QuickActionItem[] = [
    {
      id: "1",
      label: t("Merchant.QuickActions.addnewservice"),
      url: "/merchant/dashboard/services",
    },
    {
      id: "2",
      label: t("Merchant.QuickActions.addstaff"),
      url: "/merchant/dashboard/staff",
    },
    {
      id: "3",
      label: t("Merchant.QuickActions.addbooking"),
      url: "/merchant/dashboard/bookings/",
    },
    {
      id: "4",
      label: t("Merchant.QuickActions.seetransaction"),
      url: "/merchant/dashboard/transactions",
    },
  ];
  return (
    <div className="space-y-8">
      <QuickActions items={actions} />
    </div>
  );
}
