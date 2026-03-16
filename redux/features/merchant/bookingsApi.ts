import { baseApi } from "@/redux/api/baseApi";

export const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  All Bookings
    allBookings: builder.query({
      query: () => ({
        url: "/admin/booking/index",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),

    // Single Booking
    getBookingById: builder.query({
      query: (id: number | string) => ({
        url: `/admin/booking/show/${id}`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),

    // Create Booking
    createBooking: builder.mutation({
      query: (body) => ({
        url: "/admin/booking/store",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bookings"],
    }),

    // Get Booking Schedule by service & date
    getBookingSchedule: builder.query({
      query: ({ service_id, date }: { service_id: number; date: string }) => ({
        url: `/admin/booking/schedule`,
        method: "GET",
        params: { service_id, date },
      }),
      providesTags: ["Bookings"],
    }),

    // Get Booking Staff Schedule by service, date & time
    getBookingStaffSchedule: builder.query({
      query: ({
        service_id,
        date,
        time,
      }: {
        service_id: number;
        date: string;
        time: string;
      }) => ({
        url: `/admin/service/index`,
        method: "GET",
        params: { service_id, date, time },
      }),
      providesTags: ["Bookings"],
    }),

        // Download Invoice ById
        getDownloadInvoiceById: builder.query<Blob, number | string>({
          query: (id) => ({
            url: `/admin/booking/invoice-by-merchant/${id}`,
            method: "GET",
            responseHandler: (response) => response.blob(), 
          }),
          providesTags: ["Bookings"],
        }),
  }),
});

export const {
  useAllBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useGetBookingScheduleQuery,
  useGetBookingStaffScheduleQuery,
  useLazyGetDownloadInvoiceByIdQuery,
} = bookingsApi;