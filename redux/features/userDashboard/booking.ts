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
    }),

    // booking services
    bookingService: builder.query({
      query: (service_name: string) => ({
        url: `admin/service/userindex?service_name`,
        method: "GET",
        params: {
          service_name,
        },
      }),
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
    }),

    // payment information
    paymentInformation: builder.mutation({
      query: (data) => ({
        url: "/admin/booking/service-booking",
        method: "POST",
        body: data,
      }),
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
  usePaymentInformationMutation,
  useSelectStaffQuery,
  useBookingSuccessfullQuery,
} = dashboardApi;
