import { Context } from "hono";
import { invalidateSession, validateSessionToken } from "./sessions";
import { deleteCookie, getCookie } from "hono/cookie";

export async function logout(c: Context<{ Bindings: Env }>): Promise<void> {
  const token = getCookie(c, "session");

  if (!token) {
    return;
  }

  deleteCookie(c, "session");

  const validationResult = await validateSessionToken(c, token);
  if (!validationResult.isSuccess) {
    return;
  }

  await invalidateSession(c, validationResult.session.id);
}
