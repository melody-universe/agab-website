import { Hono } from "hono";
import api from "./api";
import { routes } from "./routes";
import { ssrWithLoader } from "./lib/ssr";

const app = new Hono<{ Bindings: Env }>();

app.route("/api", api);

routes.forEach((route) => {
  // @ts-expect-error TODO: Improve type safety of routes.
  app.get(route.path, ssrWithLoader(route));
});

export default app;
