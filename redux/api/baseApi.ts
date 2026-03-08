import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      // console.log('====================================');
      // console.log('Token:', token);
      // console.log('====================================');

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Payment", "Plan", "Subscription","information","Tapkey","merchant","Merchants","Dashboard", "Services", "Staff","MiniSite", "Transaction"],
  endpoints: () => ({}),
});
