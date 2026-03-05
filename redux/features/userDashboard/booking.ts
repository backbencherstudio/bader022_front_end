import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //booking history
    bookingHistory: builder.query({
      query: () => ({
        url: "/admin/dashboard/history",
        method: "GET",
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
  }),
});
export const {
  useBookingHistoryQuery,
  useBookingServiceQuery,
  useBookingTimeDateQuery,
} = dashboardApi;
