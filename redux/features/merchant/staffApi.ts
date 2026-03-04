import { baseApi } from "@/redux/api/baseApi";


export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  all staff
    allStaff: builder.query({
      query: () => ({
        url: "/admin/staff/index",
        method: "GET",
      }),
      providesTags: ["Staff"],
    }),

        // Create Staff
    createStaff: builder.mutation<any, FormData>({
          query: (formData) => ({
            url: "/admin/staff/store",
            method: "POST",
            body: formData,
          }),
          invalidatesTags: ["Staff"],
        }),

    // Update Staff
    updateStaffById: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/admin/staff/update/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Staff"],
    }),

    // Delete Staff
    deleteStaffById: builder.mutation<any, string>({
    query: (id) => ({
      url: `/admin/staff/delete/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Staff"],
  }),
  }),
});

export const {
  useAllStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffByIdMutation,
  useDeleteStaffByIdMutation
} = staffApi;
