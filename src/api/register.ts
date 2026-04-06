import { Context } from "hono";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/d1";
import { users } from "../db/schema";

export async function register(c: Context<{ Bindings: Env }>): Promise<void> {
  const { username, password } = await c.req.json<RegisterPayload>();

  const hashedPassword = await bcrypt.hash(password, 10);

  const db = drizzle(c.env.DB);
  await db.insert(users).values({ username, password: hashedPassword });
}

export type RegisterPayload = {
  username: string;
  password: string;
};
