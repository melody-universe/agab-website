import type { Fetcher } from "@cloudflare/workers-types";
import { Hono } from "hono";
import api from "./api";
import { routes } from "./routes";
import { ssrWithLoader } from "./lib/ssr";

export type CloudflareBindings = { ASSETS: Fetcher };

const app = new Hono<{ Bindings: Env }>();

app.route("/api", api);

routes.forEach((route) => {
  app.get(route.path, ssrWithLoader(route));
});

export default app;
