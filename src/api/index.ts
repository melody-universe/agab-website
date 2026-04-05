import { Hono } from "hono";
import { getAcronyms } from "./acronyms";

const api = new Hono<{ Bindings: Env }>().get("/acronyms", async (c) =>
  c.json(await getAcronyms(c)),
);

export type Api = typeof api;
export default api;
