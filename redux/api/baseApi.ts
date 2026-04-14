// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { RootState } from "../store";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL,
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth.token;
//       // console.log('====================================');
//       // console.log('Token:', token);
//       // console.log('====================================');

//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }

//       return headers;
//     },
//   }),
//   tagTypes: ["Auth","User", "Payment", "Plan", "Subscription","information","Tapkey","merchant","Merchants","Dashboard","Bookings", "Services", "Staff","MiniSite","Analytics", "Transaction", "Setting" ,"Reschedule"],
//   endpoints: () => ({}),
// });


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";



const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const remember_token = (getState() as RootState).auth.remember_token;

    console.log(token);
    
    console.log(remember_token);
    
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    else if (remember_token) {
      headers.set("remember_token", remember_token);
    }

    return headers;
  },
});

const baseQueryWithAuthCheck = async (args: any, api: any, extraOptions: any) => {
  const result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // remove token from localStorage
    localStorage.removeItem("token");

    // optional: clear redux auth state
    api.dispatch({ type: "auth/logout" });

    // redirect to login page
    // if (typeof window !== "undefined") {
    //   window.location.href = "/";
    // }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuthCheck,
  tagTypes: [
    "Auth",
    "User",
    "Payment",
    "Plan",
    "Subscription",
    "information",
    "Tapkey",
    "merchant",
    "Merchants",
    "Dashboard",
    "Bookings",
    "Services",
    "Staff",
    "MiniSite",
    "Analytics",
    "Transaction",
    "Setting",
    "Reschedule",
  ],
  endpoints: () => ({}),
});
