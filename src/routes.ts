import * as adminLogin from "./app/routes/admin/login";
import * as home from "./app/routes/home";

export const routes = [
  { path: "/", ...home },
  { path: "/admin/login", ...adminLogin },
] as const;
