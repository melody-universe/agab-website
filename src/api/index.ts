import { Hono } from "hono";
import { getAcronyms } from "./acronyms";
import { register } from "./register";
import { csrf } from "hono/csrf";
import { login } from "./login";
import { deleteCookie, getCookie } from "hono/cookie";
import { validateSessionToken } from "./sessions";
import { routePath } from "hono/route";
import { getUsers } from "./users";

const api = new Hono<{ Bindings: Env }>()
  .use(csrf())
  .use(async (c, next) => {
    if (routePath(c, -1) === "/api/acronyms") {
      return await next();
    }

    const token = getCookie(c, "session");

    if (!token) {
      if (isAuthRoute()) {
        return await next();
      }

      c.status(403);
      return c.newResponse(null);
    }

    const sessionValidation = await validateSessionToken(c, token);

    if (!sessionValidation.isSuccess) {
      deleteCookie(c, "session");

      if (isAuthRoute()) {
        return await next();
      }

      c.status(401);
      return c.newResponse(null);
    }

    if (isAuthRoute()) {
      c.status(403);
      return c.newResponse(null);
    }

    return await next();

    function isAuthRoute() {
      return ["/api/login", "/api/register"].includes(routePath(c, -1));
    }
  })
  .get("/acronyms", async (c) => c.json(await getAcronyms(c)))
  .post("/login", async (c) => c.json(await login(c)))
  .post("/register", async (c) => c.json(await register(c)))
  .get("/users", async (c) => c.json(await getUsers(c)));

export type Api = typeof api;
export default api;
