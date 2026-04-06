import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { users } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function login(
  c: Context<{ Bindings: Env }>,
): Promise<LoginResult> {
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

type LoginResult = { isSuccess: true; userId: number } | { isSuccess: false };
