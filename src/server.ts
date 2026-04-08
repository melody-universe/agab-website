import { Hono } from "hono";
import api from "./api";
import { routes } from "./routes";
import { ssr } from "./lib/ssr";
import { csrf } from "hono/csrf";

const app = new Hono<{ Bindings: Env }>();

app.use(csrf());

app.route("/api", api);

routes.forEach((route) =>
  route.middleware
    ? app.get(route.path, route.middleware, ssr(route))
    : app.get(route.path, ssr(route)),
);

export default app;
