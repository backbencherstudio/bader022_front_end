import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { addMonths, format, subMonths } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function MonthPicker({
  value,
  onChange,
}: {
  value: Date;
  onChange: (d: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span>Pick from Calendar</span>
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange(subMonths(value, 1))}
          >
            <span className="sr-only">Previous</span>◀
          </Button>
          <div className="text-sm font-medium">
            {format(value, "MMMM yyyy")}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange(addMonths(value, 1))}
          >
            <span className="sr-only">Next</span>▶
          </Button>
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const d = new Date(value.getFullYear(), i, 1);
            const active = d.getMonth() === value.getMonth();
            return (
              <Button
                key={i}
                variant={active ? "default" : "outline"}
                className="justify-center"
                onClick={() => onChange(d)}
              >
                {format(d, "MMM")}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
