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
      query: ({ page = 1, status = "" }) => ({
        url: "/admin/dashboard/payment-history",
        method: "GET",
        params: {
          status,
          page,
        },
      }),
    }),

    

    //invoice download
    // userDashboardApi.ts
    invoiceDownload: builder.query<Blob, number>({
      query: (id) => ({
        url: `/admin/booking/invoice/${id}`,
        method: "GET",
        responseHandler: (response) => response.blob(), 
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

    //single bokk details
    getSingleBooking: builder.query({
      query: (id) => ({
        url: `/admin/dashboard/show/${id}`,
        method: "GET",
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
    //cancel appointment
    cancelAppoitment: builder.query({
      query: ({ booking_id }) => ({
        url: `/admin/dashboard/cancel-preview/${booking_id}`,
        method: "GET",
      }),
      providesTags: ["Reschedule"],
    }),

    //confirm cancel appointment
    confirmCancelAppointment: builder.mutation({
      query: ({ booking_id }: { booking_id: number }) => ({
        url: `/admin/dashboard/cancel-booking/${booking_id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Reschedule"],
    }),
  }),
});
export const {
  useDashboardActivityQuery,
  useUserPaymentHistoryQuery,
  useLazyInvoiceDownloadQuery,
  useDashboardbookingHistoryQuery,
  useGetSingleBookingQuery,
  useUpcommingQuery,
  useOrderDetailsQuery,
  useRescheduleAppointmentQuery,
  useSheduleQuery,
  useSheduleStaffQuery,
  useUseRescheduleAppointmentMutation,
  useCancelAppoitmentQuery,
  useConfirmCancelAppointmentMutation,
  
} = dashboardApi;