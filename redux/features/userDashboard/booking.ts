import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // booking history
    bookingHistory: builder.query({
      query: ({
        page = 1,
        date_filter = "",
        status = "",
        service_name = "",
      }) => ({
        url: "/admin/dashboard/history",
        method: "GET",
        params: {
          page,
          date_filter,
          status,
          service_name,
        },
      }),
      providesTags: ["UserBooking"],
    }),

    // booking services
    bookingService: builder.query({
      query: (service_name: string) => ({
        url: `/admin/service/userindex`,
        method: "GET",
        params: {
          service_name,
        },
      }),
      providesTags: ["UserBooking"],
    }),

    // select step 2 time and date
    bookingTimeDate: builder.query({
      query: ({ service_id, date }) => ({
        url: "/admin/booking/schedule",
        method: "GET",
        params: {
          service_id,
          date,
        },
      }),
      providesTags: ["UserBooking"],
    }),

   // select step 2 time and date
    serviceBookingTimeDate: builder.query({
      query: ({ service_id, date ,domain }) => ({
        url: `/bokli/schedule/${domain}`,
        method: "GET",
        params: {
          service_id,
          date,
        },
      }),
      providesTags: ["UserBooking"],
    }),

    // select staff
    selectStaff: builder.query({
      query: ({ service_id, date, time }) => ({
        url: "/admin/booking/staff",
        method: "GET",
        params: {
          service_id,
          date,
          time,
        },
      }),
      providesTags: ["UserBooking"],
    }),

    // payment information
    paymentInformation: builder.mutation({
      query: (data) => ({
        url: "/admin/booking/service-booking",
        method: "POST",
        body: data,
      }),
       invalidatesTags: ["Bookings"],
    }),

    // booking successful
    bookingSuccessfull: builder.query<any, { booking_id: number }>({
      query: ({ booking_id }) => ({
        url: `/booking-details/${booking_id}`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
  }),
});

export const {
  useBookingHistoryQuery,
  useBookingServiceQuery,
  useBookingTimeDateQuery,
  useServiceBookingTimeDateQuery,
  usePaymentInformationMutation,
  useSelectStaffQuery,
  useBookingSuccessfullQuery,
} = dashboardApi;
