export type Role = "Admin" | "Merchant" | "User";

export function getAuth() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
}

export function authorize(allowedRoles: Role[]) {
  const auth = getAuth();

  if (!auth?.token || !auth?.user) {
    return { authorized: false };
  }

  const role = auth.user.role;

  if (!allowedRoles.includes(role)) {
    return { authorized: false };
  }

  return { authorized: true, user: auth.user };
}