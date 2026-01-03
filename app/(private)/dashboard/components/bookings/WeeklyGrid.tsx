import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DAYS_SHORT } from "../../bookings/page";

function formatTimeLabel(t: string) {
  const [hh] = t.split(":");
  const n = Number(hh);
  const suffix = n >= 12 ? "pm" : "am";
  const display = n % 12 === 0 ? 12 : n % 12;
  return `${display}${suffix}`;
}

export default function WeeklyGrid({
  monthLabel,
}: // In real implementation you will transform bookings into time-slot cells.
{
  monthLabel: string;
}) {
  const times = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="grid grid-cols-8 border-b bg-muted/20">
        <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
          Time
        </div>
        {DAYS_SHORT.map((d) => (
          <div
            key={d}
            className="px-3 py-2 text-xs font-medium text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      {times.map((t) => (
        <div key={t} className="grid grid-cols-8 border-b last:border-b-0">
          <div className="px-3 py-4 text-xs font-medium text-muted-foreground">
            {formatTimeLabel(t)}
          </div>

          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="min-h-19.5 border-l p-2">
              {/* UI placeholder. You will render bookings mapped to time/day. */}
              {t === "07:00" && i === 0 ? (
                <div className="space-y-2">
                  <div className="w-full rounded-md border bg-violet-100 px-2 py-1.5 text-[11px] text-violet-900">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px]">
                          BC
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">
                          Bessie Cooper
                        </div>
                        <div className="truncate opacity-80">Beard Trim</div>
                      </div>
                    </div>
                    <div className="mt-1 truncate opacity-80">
                      7:00:15 - 7:30 pm
                    </div>
                  </div>

                  <button className="text-[11px] font-medium text-foreground/80 hover:text-foreground">
                    2 more...
                  </button>
                </div>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground">
        <span>{monthLabel}</span>
        <span>Weekly grid shell • map real data to time slots</span>
      </div>
    </div>
  );
}
