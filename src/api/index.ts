import { Hono, MiddlewareHandler } from "hono";
import { getAcronyms } from "./acronyms";
import { register } from "./register";
import { csrf } from "hono/csrf";
import { login } from "./login";
import { getUsers } from "./users";
import { logout } from "./logout";
import { getRole, Role } from "../lib/getRole";
import { StatusCode } from "hono/utils/http-status";

const api = new Hono<{ Bindings: Env }>()
  .use(csrf())
  .get("/acronyms", async (c) => c.json(await getAcronyms(c)))
  .post("/login", requireRole(Role.Anonymous), async (c) =>
    c.json(await login(c)),
  )
  .post("/register", requireRole(Role.Anonymous), async (c) =>
    c.json(await register(c)),
  )
  .post("/logout", async (c) => {
    await logout(c);
    return c.newResponse(null);
  })
  .get("/users", requireRole(Role.Admin), async (c) =>
    c.json(await getUsers(c)),
  );

export type Api = typeof api;
export default api;

function requireRole(
  requiredRole: Role,
  statusCode: StatusCode = 403,
): MiddlewareHandler<{ Bindings: Env }> {
  return async (c, next) => {
    const currentRole = await getRole(c);

    if (currentRole !== requiredRole) {
      c.status(statusCode);
      return c.newResponse(null);
    }

    await next();
  };
}
