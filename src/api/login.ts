import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { users } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createSession, generateSessionToken } from "./sessions";
import { setCookie } from "hono/cookie";

export async function login(
  c: Context<{ Bindings: Env }>,
): Promise<LoginResult> {
  const verificationResult = await verifyUserPassword(c);

  if (!verificationResult.isSuccess) {
    return { isSuccess: false };
  }

  const token = generateSessionToken();
  const session = await createSession(c, token, verificationResult.userId);

  setCookie(c, "session", token, {
    expires: session.expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    secure: true,
  });

  return { isSuccess: true };
}

type LoginResult = { isSuccess: boolean };

async function verifyUserPassword(
  c: Context<{ Bindings: Env }>,
): Promise<VerifyUserPasswordResult> {
  const { username, password } = await c.req.json<LoginPayload>();

  const db = drizzle(c.env.DB);

  const result = await db
    .select()
    .from(users)
    .where(eq(sql`lower(${users.username})`, username));

  if (result.length === 0) {
    return { isSuccess: false };
  }

  const user = result[0];

  const doesPasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesPasswordMatch) {
    return { isSuccess: false };
  }

  return { isSuccess: true, userId: user.id };
}

type LoginPayload = { username: string; password: string };

type VerifyUserPasswordResult =
  | { isSuccess: true; userId: number }
  | { isSuccess: false };
