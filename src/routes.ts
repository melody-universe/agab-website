import * as login from "./app/routes/admin/login";
import * as register from "./app/routes/admin/register";
import * as home from "./app/routes/home";

export const routes = [
  { path: "/", ...home },
  { path: "/admin/login", ...login },
  { path: "/admin/register", ...register },
] as const;
