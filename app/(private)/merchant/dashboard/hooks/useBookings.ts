// import { format } from "date-fns";
// import { useEffect, useState } from "react";
// import { TBooking, TBookingFilters } from "../bookings/page";

// export default function useBookings(filters: TBookingFilters) {
//   const [data, setData] = useState<TBooking[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // IMPORTANT: Debounce search to avoid hammering API.
//   const debouncedSearch = useDebouncedValue(filters.search, 400);

//   useEffect(() => {
//     let cancelled = false;

//     async function run() {
//       setLoading(true);
//       setError(null);

//       try {
//         // You MUST replace this with your real endpoint.
//         // Query suggestion:
//         // GET /api/bookings?month=2025-01&scope=upcoming&filterBy=staff&search=josh
//         const monthParam = format(filters.month, "yyyy-MM");
//         const qs = new URLSearchParams({
//           month: monthParam,
//           scope: filters.scope,
//           filterBy: filters.filterBy,
//           search: debouncedSearch,
//         });

//         const res = await fetch(`/api/bookings?${qs.toString()}`, {
//           cache: "no-store",
//         });

//         if (!res.ok) throw new Error("Failed to fetch bookings");

//         const json = (await res.json()) as { bookings: TBooking[] };
//         if (cancelled) return;

//         // Normalize data here (critical)
//         const normalized = (json.bookings ?? []).map((b) => ({
//           ...b,
//           color: b.color ?? (Math.random() > 0.5 ? "purple" : "blue"),
//         }));

//         setData(normalized);
//       } catch (e: any) {
//         if (cancelled) return;
//         setError(e?.message ?? "Something went wrong");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     run();
//     return () => {
//       cancelled = true;
//     };
//   }, [filters.month, filters.scope, filters.filterBy, debouncedSearch]);

//   return { bookings: data, loading, error };
// }

// function useDebouncedValue<T>(value: T, delay = 400) {
//   const [debounced, setDebounced] = useState(value);
//   useEffect(() => {
//     const t = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(t);
//   }, [value, delay]);
//   return debounced;
// }

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TBooking, TBookingFilters } from "../bookings/page";

const USE_DUMMY = process.env.NEXT_PUBLIC_USE_DUMMY_BOOKINGS === "true";

export default function useBookings(filters: TBookingFilters) {
  const [data, setData] = useState<TBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(filters.search, 400);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);

      try {
        if (USE_DUMMY) {
          const dummy = getDummyBookings(filters);
          setData(dummy);
          return;
        }

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

        const normalized = (json.bookings ?? []).map((b) => ({
          ...b,
          color: b.color ?? (Math.random() > 0.5 ? "purple" : "blue"),
        }));

        setData(normalized);
      } catch (e: any) {
        // fallback dummy data if API fails
        const dummy = getDummyBookings(filters);
        setData(dummy);
        setError("API not ready — showing dummy data");
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

function getDummyBookings(filters: TBookingFilters): TBooking[] {
  // ✅ Range: Dec 28 (previous month) → Jan 31 (current month)
  const now = new Date();
  const year = now.getFullYear();

  const startDate = new Date(year - 1, 11, 28); // Dec 28 last year
  const endDate = new Date(year, 0, 31); // Jan 31 current year

  const names = [
    "Joshua Jones",
    "Sarah Johnson",
    "Jerry Helfer",
    "Patricia Sanders",
    "David Elison",
    "Jane Cooper",
    "Bessie Cooper",
    "Cameron William",
    "Cody Fisher",
    "Albert Flores",
    "Courtney Henry",
    "Kristin Watson",
    "Arlene McCoy",
    "Jacob Jones",
    "Guy Hawkins",
    "Dianne Russell",
  ];

  const services = ["Haircut & Styling", "Beard Trim", "Facial", "Hair Color"];
  const staffs = [
    "Kenneth Allen",
    "Katie Sims",
    "Guy Hawkins",
    "Kristin Watson",
  ];

  const timeSlots = [
    { h: 7, m: 0, range: "7:00 - 7:30 am" },
    { h: 8, m: 15, range: "8:15 - 8:50 am" },
    { h: 10, m: 0, range: "10:00 - 10:45 am" },
    { h: 12, m: 0, range: "12:00 - 12:30 pm" },
    { h: 15, m: 30, range: "3:30 - 4:15 pm" },
    { h: 18, m: 15, range: "6:15 - 7:30 pm" },
    { h: 20, m: 0, range: "8:00 - 8:45 pm" },
  ];

  const dummy: TBooking[] = [];
  let idCounter = 1;

  // ✅ Generate bookings for each day
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    // ✅ Some days should have multiple bookings so "+2 more..." appears
    const bookingCount =
      date.getDay() === 0 || date.getDay() === 6
        ? 3 // weekends
        : 1 + Math.floor(Math.random() * 2); // weekdays 1-2

    for (let i = 0; i < bookingCount; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomService =
        services[Math.floor(Math.random() * services.length)];
      const randomStaff = staffs[Math.floor(Math.random() * staffs.length)];
      const slot = timeSlots[Math.floor(Math.random() * timeSlots.length)];

      const startAt = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        slot.h,
        slot.m
      );

      const endAt = new Date(startAt);
      endAt.setMinutes(endAt.getMinutes() + 45);

      dummy.push({
        id: `d${idCounter++}`,
        customerName: randomName,
        avatarUrl: "",
        service: randomService,
        staff: randomStaff,
        timeRange: slot.range,
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        color: Math.random() > 0.5 ? "purple" : "blue",
      });
    }
  }

  // ✅ Apply search filter
  const search = filters.search.toLowerCase().trim();
  let filtered = dummy;

  if (search) {
    filtered = filtered.filter(
      (b) =>
        b.customerName.toLowerCase().includes(search) ||
        b.staff.toLowerCase().includes(search) ||
        b.service.toLowerCase().includes(search)
    );
  }

  //  Scope filter (upcoming/past)
  const today = new Date();

  if (filters.scope === "upcoming") {
    filtered = filtered.filter((b) => new Date(b.endAt) >= today);
  }

  if (filters.scope === "past") {
    filtered = filtered.filter((b) => new Date(b.endAt) < today);
  }

  return filtered;
}
