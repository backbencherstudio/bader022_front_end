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

   createBooking: builder.mutation({
      query: (body) => ({
        url: "/admin/booking/store",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bookings"],
    }),

    // Create Service
    // createService: builder.mutation<any, FormData>({
    //       query: (formData) => ({
    //         url: "/admin/service/store",
    //         method: "POST",
    //         body: formData,
    //       }),
    //       invalidatesTags: ["Bookings"],
    //     }),

    // Update Service
    // updateServiceById: builder.mutation<any, { id: string; formData: FormData }>({
    //   query: ({ id, formData }) => ({
    //     url: `/admin/service/update/${id}`,
    //     method: "POST",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["Bookings"],
    // }),

    // Delete Service
//     deleteServiceById: builder.mutation<any, string>({
//     query: (id) => ({
//       url: `/admin/service/delete/${id}`,
//       method: "DELETE",
//     }),
//     invalidatesTags: ["Bookings"],
//   }),
    
  }),
});

export const {
  useAllBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
//   useUpdateServiceByIdMutation,
//   useDeleteServiceByIdMutation
} = bookingsApi;