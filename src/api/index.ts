import { Hono } from "hono";
import { getAcronyms } from "./acronyms";
import { register } from "./register";
import { login } from "./login";
import { getUsers } from "./users";
import { logout } from "./logout";
import { Role } from "../lib/getRole";
import { requireRole } from "../lib/requireRole";

const api = new Hono<{ Bindings: Env }>()
  .get("/acronyms", async (c) => c.json(await getAcronyms(c)))
  .post("/login", requireRole(Role.Anonymous, { statusCode: 403 }), async (c) =>
    c.json(await login(c)),
  )
  .post(
    "/register",
    requireRole(Role.Anonymous, { statusCode: 403 }),
    async (c) => c.json(await register(c)),
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
