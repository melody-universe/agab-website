import { Hono } from "hono";
import { getAcronyms } from "./acronyms";
import { register } from "./register";
import { csrf } from "hono/csrf";

const api = new Hono<{ Bindings: Env }>()
  .use(csrf())
  .get("/acronyms", async (c) => c.json(await getAcronyms(c)))
  .post("/register", async (c) => c.json(await register(c)));

export type Api = typeof api;
export default api;
