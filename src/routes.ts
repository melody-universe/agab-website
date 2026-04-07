import * as admin from "./app/routes/admin/admin";
import * as login from "./app/routes/admin/login";
import * as register from "./app/routes/admin/register";
import * as home from "./app/routes/home";
import { Route } from "./route";

export const routes: Route<unknown>[] = [home, admin, login, register] as const;
