import { Context } from "hono";
import { users } from "../db/schema";
import { drizzle } from "drizzle-orm/d1";

export async function getUsers(
  c: Context<{ Bindings: Env }>,
): Promise<string[]> {
  const db = drizzle(c.env.DB);
  const allUsers = await db.select().from(users);
  return allUsers.map((u) => u.username);
}
