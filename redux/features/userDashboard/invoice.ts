// import { RootState } from "@reduxjs/toolkit/query";
// import { createApi } from "@reduxjs/toolkit/query";
// import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// export const userDashboardApi = createApi({
//   reducerPath: "userDashboardApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "/api/admin/dashboard",
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth.access_token;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     // userDashboardApi.ts
//     invoiceDownload: builder.query({
//       query: (bookingID) => ({
//         url: `/invoice/download/${bookingID}`,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, 
//         },
//       }),
//     }),
//   }),
// });
