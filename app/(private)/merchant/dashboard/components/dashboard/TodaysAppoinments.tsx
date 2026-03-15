import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Appointment = {
  id: string;
  datetimeLabel: string;
  customerName: string;
  serviceName: string;
};

function AppointmentRow({ item }: { item: Appointment }) {
  console.log(item);

  return (
    <div className="relative flex gap-4">
      {/* Dot */}
      <div className="relative z-10 mt-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-muted/40">
        <div className="h-2 w-2 rounded-full bg-foreground" />
      </div>

      {/* Text */}
      <div className="pb-6">
        <p className="text-xs text-muted-foreground">{item.datetimeLabel}</p>
        <p className="mt-1 text-sm font-semibold leading-none text-foreground">
          {item.customerName}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{item.serviceName}</p>
      </div>
    </div>
  );
}

export function TodaysAppointments({
  items,
  className,
  title = "Today's Appointments",
}: {
  items: Appointment[];
  title?: string;
  className?: string;
}) {
  return (
    <Card
      className={`px-0 w-full rounded-xl bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
               lg:w-1/4 shadow-sm ${className ?? ""}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="p-2!">
        <div
          className={[
            "relative max-h-118 overflow-y-auto pr-3",
            // Webkit scrollbar styling (no plugin needed)
            "[&::-webkit-scrollbar]:w-2",
            "[&::-webkit-scrollbar-track]:bg-transparent",
            "[&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20",
            "hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30",
          ].join(" ")}
        >
          {/* Timeline line */}
          <div className="pointer-events-none absolute top-0 h-full w-px bg-muted/40" />

          {/* <div className="space-y-0">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={idx === items.length - 1 ? "pb-2" : ""}
              >
                <AppointmentRow item={item} />
              </div>
            ))}
          </div> */}
          <div className="space-y-0">
            {items.length === 0 ? (
              <div className="relative flex gap-4">
                <div className="relative z-10 mt-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-muted/40">
                  <div className="h-2 w-2 rounded-full bg-foreground" />
                </div>

                <div className="pb-6">
                  <p className="text-xs text-muted-foreground">
                    No appointments today
                  </p>
                </div>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={item.id}
                  className={idx === items.length - 1 ? "pb-2" : ""}
                >
                  <AppointmentRow item={item} />
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
