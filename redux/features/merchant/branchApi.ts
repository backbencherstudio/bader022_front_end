import { baseApi } from "@/redux/api/baseApi";


export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  all Branch
    allBranch: builder.query({
      query: () => ({
        url: "/admin/branch/index",
        method: "GET",
      }),
      providesTags: ["Branch"],
    }),

  }),
});

export const {
  useAllBranchQuery,

} = branchApi;