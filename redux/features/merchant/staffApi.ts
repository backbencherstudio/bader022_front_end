import { baseApi } from "@/redux/api/baseApi";


export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  all staff
    allStaff: builder.query({
      query: () => ({
        url: "/admin/staff/index",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllStaffQuery,
} = staffApi;
