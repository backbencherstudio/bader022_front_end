import { baseApi } from "@/redux/api/baseApi";

import { Search } from 'lucide-react';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardActivity: builder.query({
      query: () => ({
        url: "/admin/dashboard/activity",
        method: "GET",
      }),
    }),

    // payment history

    userPaymentHistory: builder.query({
      query: ({ page = 1, search = "" }) => ({
        url: "/admin/dashboard/payment-history",
        method: "GET",
        params: {
          search,
          page,
        },
      }),
    }),

    DashboardbookingHistory: builder.query({
      query: ({
        page = 1,
        search = "",
        status = "",
        service_name = "",
        data_filter = "",
      }) => ({
        url: "/admin/dashboard/history",
        method: "GET",
        params: { page, service_name, status, search, data_filter },
      }),
    }),

    //upcomming

    Upcomming: builder.query({
      query: () => ({
        url: "/admin/dashboard/upcoming",
        method: "GET",
      }),
    }),

    //orders details
    orderDetails: builder.query({
      query: (booking_id: number) => ({
        url: `/admin/dashboard/view-order-details/${booking_id}`,
        method: "GET",
      }),
    }),

    //resedule appointment

    RescheduleAppointment: builder.query({
      query: ({ service_id = "", date = "" }) => ({
        url: `/admin/booking/schedule`,
        method: "GET",
        params: {
          service_id,
          date,
        },
        providesTags: ["Reschedule"],
      }),
    }),

    //select stup
    shedule: builder.query({
      query: ({ service_id, date }) => ({
        url: "/admin/booking/schedule",
        method: "GET",
        params: {
          service_id,
          date,
        },
        providesTags: ["Reschedule"],
      }),
    }),

    sheduleStaff: builder.query({
      query: ({ service_id, date, time }) => ({
        url: `/admin/booking/staff`,
        method: "GET",
        params: {
          service_id,
          date,
          time,
        },
        providesTags: ["Reschedule"],
      }),
    }),

    //reshwedule update
    useRescheduleAppointment: builder.mutation({
      query: ({ booking_id, date, time, staff_id }) => ({
        url: `/admin/dashboard/reschedule-booking/${booking_id}`,
        method: "POST",
        body: {
          date,
          time,
          staff_id,
        },
        invalidatesTags: ["Reschedule"],
      }),
    }),
  }),
});
export const {
  useDashboardActivityQuery,
  useUserPaymentHistoryQuery,
  useDashboardbookingHistoryQuery,
  useUpcommingQuery,
  useOrderDetailsQuery,
  useRescheduleAppointmentQuery,
  useSheduleQuery,
  useSheduleStaffQuery,
useUseRescheduleAppointmentMutation,
} = dashboardApi;