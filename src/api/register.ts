import { Context } from "hono";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/d1";
import { users } from "../db/schema";
import { setCookie } from "hono/cookie";
import { generateSessionToken, createSession } from "./sessions";

export async function register(
  c: Context<{ Bindings: Env }>,
): Promise<RegisterResult> {
  const { username, password } = await c.req.json<RegisterPayload>();

  const hashedPassword = await bcrypt.hash(password, 10);

  const db = drizzle(c.env.DB);
  const user = await db
    .insert(users)
    .values({ username, password: hashedPassword })
    .returning();

  const token = generateSessionToken();
  const session = await createSession(c, token, user[0].id);

  setCookie(c, "session", token, {
    expires: session.expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    secure: true,
  });

  return { isSuccess: true };
}

type RegisterResult = { isSuccess: boolean };

export type RegisterPayload = {
  username: string;
  password: string;
};
