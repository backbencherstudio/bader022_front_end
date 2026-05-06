import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Role = "Admin" | "User" | "Merchant";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  miniSiteAccess: boolean;
  website_domain:string
  phone?:string
  image?: String;
}

interface AuthState {
  token: string | null;
  remember_token: string | null;
  user: User | null;
  branch:string | null

}

const getInitialState = (): AuthState => {
  if (typeof window !== "undefined") {
    return {
      token: localStorage.getItem("token"),
      remember_token: localStorage.getItem("remember_token"),
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null,
      branch:localStorage.getItem("branch"),
    };
  }

  return {
    token: null,
    remember_token: null,
    user: null,
    branch:null
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
setCredentials: (
  state,
  action: PayloadAction<{
    token?: string;
    remember_token?: string;
    user?: Partial<User>;
    branch?:string;
  }>,
) => {
  if (action.payload.token) {
    state.token = action.payload.token;
    localStorage.setItem("token", action.payload.token);
    Cookies.set("auth_token", action.payload.token, { expires: 7 });
  }

  if (action.payload.remember_token) {
    state.remember_token = action.payload.remember_token;
    localStorage.setItem("remember_token", action.payload.remember_token);
    
  }

  if (action.payload.user) {
    state.user = {
      ...state.user,
      ...action.payload.user,
    } as User;

    localStorage.setItem("user", JSON.stringify(state.user));
    Cookies.set("user_role", state.user.role || "", { expires: 7 });
  }

  if (action.payload.branch) {
    state.branch = action.payload.branch;
    localStorage.setItem("branch", action.payload.branch);
  }
},
    logout: (state) => {
      state.token = null;
      state.user = null;
      // localStorage.clear();
      Cookies.remove("auth_token");
      Cookies.remove("user_role");

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
