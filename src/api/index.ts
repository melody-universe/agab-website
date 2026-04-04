import { Hono } from "hono";
import { CloudflareBindings } from "../server";
import { acronyms } from "./acronyms";

const api = new Hono<{ Bindings: CloudflareBindings }>().get("/acronyms", (c) =>
  c.json(acronyms),
);

export type Api = typeof api;
export default api;
