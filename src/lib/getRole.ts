import { Context } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";
import { validateSessionToken } from "../api/sessions";

export async function getRole(c: Context<{ Bindings: Env }>): Promise<Role> {
  const token = getCookie(c, "session");

  if (!token) {
    return Role.Anonymous;
  }

  const result = await validateSessionToken(c, token);

  if (!result.isSuccess) {
    deleteCookie(c, "session");
    return Role.Anonymous;
  }

  return Role.Admin;
}

export const Role = {
  Admin: "admin",
  Anonymous: "anonymous",
} as const satisfies Record<string, string>;

export type Role = (typeof Role)[keyof typeof Role];
