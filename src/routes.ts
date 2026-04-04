import * as home from "./app/routes/home";

export const routes = [{ path: "/", ...home }] as const;
