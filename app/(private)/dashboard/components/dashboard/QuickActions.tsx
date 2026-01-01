import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export type QuickActionItem = {
  id: string;
  label: string;
  onClick?: () => void;
};

function ActionTile({ item }: { item: QuickActionItem }) {
  return (
    <button type="button" onClick={item.onClick} className="group text-left">
      <Card
        className={[
          "h-24 w-full rounded-2xl border border-muted/50 bg-background shadow-sm",
          "transition-transform duration-150",
          "group-hover:-translate-y-px group-hover:shadow-md",
        ].join(" ")}
      >
        <div className="flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="text-sm font-medium leading-snug text-foreground">
            {item.label}
          </p>

          <ChevronRight className="mt-3 h-5 w-5 text-muted-foreground" />
        </div>
      </Card>
    </button>
  );
}

export function QuickActions({
  title = "Quick Actions",
  items,
  className,
}: {
  title?: string;
  items: QuickActionItem[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold">{title}</h3>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {items.slice(0, 4).map((item) => (
          <ActionTile key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

const actions: QuickActionItem[] = [
  { id: "1", label: "Add New\nService" },
  { id: "2", label: "Add Staff" },
  { id: "3", label: "Add Booking" },
  { id: "4", label: "See\nTransactions" },
];

export default function QuickActionsComponents() {
  return (
    <div className="space-y-8">
      <QuickActions items={actions} />
    </div>
  );
}
