import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TBooking, TBookingFilters } from "../bookings/page";

export default function useBookings(filters: TBookingFilters) {
  const [data, setData] = useState<TBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // IMPORTANT: Debounce search to avoid hammering API.
  const debouncedSearch = useDebouncedValue(filters.search, 400);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);

      try {
        // You MUST replace this with your real endpoint.
        // Query suggestion:
        // GET /api/bookings?month=2025-01&scope=upcoming&filterBy=staff&search=josh
        const monthParam = format(filters.month, "yyyy-MM");
        const qs = new URLSearchParams({
          month: monthParam,
          scope: filters.scope,
          filterBy: filters.filterBy,
          search: debouncedSearch,
        });

        const res = await fetch(`/api/bookings?${qs.toString()}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");

        const json = (await res.json()) as { bookings: TBooking[] };
        if (cancelled) return;

        // Normalize data here (critical)
        const normalized = (json.bookings ?? []).map((b) => ({
          ...b,
          color: b.color ?? (Math.random() > 0.5 ? "purple" : "blue"),
        }));

        setData(normalized);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [filters.month, filters.scope, filters.filterBy, debouncedSearch]);

  return { bookings: data, loading, error };
}

function useDebouncedValue<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
