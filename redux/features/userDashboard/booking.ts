import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //booking history
  bookingHistory: builder.query({
  query: ({ page = 1, date_filter = "", status = "", service_name = "" }) => ({
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

    //booking services
    bookingService: builder.query({
      query: (service_name: string) => ({
        url: `/admin/service/userindex/16?service_name=${service_name}`,
        method: "GET",
      }),
    }),

    //select step 2 time and date
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

    //select stup
    selectStaff: builder.query({
      query: ({ service_id, date, time }) => ({
        url: `/admin/booking/staff`,
        method: "GET",
        params: {
          service_id,
          date,
          time,
        },
      }),
    }),

    //payment information
    paymentInformation: builder.mutation({
      query: (data) => ({
        url: "/admin/booking/service-booking",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useBookingHistoryQuery,
  useBookingServiceQuery,
  useBookingTimeDateQuery,
  usePaymentInformationMutation,
  useSelectStaffQuery,
} = dashboardApi;
