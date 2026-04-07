import { Hono } from "hono";
import api from "./api";
import { routes } from "./routes";
import { ssr } from "./lib/ssr";
import { deleteCookie, getCookie } from "hono/cookie";
import { validateSessionToken } from "./api/sessions";

const app = new Hono<{ Bindings: Env }>();

app.route("/api", api);

app.use("/admin/*", async (c, next) => {
  const token = getCookie(c, "session");

  if (!token) {
    if (isOnAuthPage()) {
      return next();
    }

    return c.redirect("/admin/login");
  }

  const sessionValidation = await validateSessionToken(c, token);

  if (!sessionValidation.isSuccess) {
    deleteCookie(c, "session");

    if (isOnAuthPage()) {
      return next();
    }

    return c.redirect("/admin/login");
  }

  if (isOnAuthPage()) {
    return c.redirect("/admin");
  }

  return next();

  function isOnAuthPage() {
    return ["/admin/login", "/admin/register"].includes(c.req.path);
  }
});

routes.forEach((route) => app.get(route.path, ssr(route)));

export default app;
