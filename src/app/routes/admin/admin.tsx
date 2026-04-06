import "./admin.scss";

import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { ComponentChild } from "preact";
import { users } from "../../../db/schema";
import { Card } from "../../components/Card";

export async function loader(c: Context<{ Bindings: Env }>) {
  const db = drizzle(c.env.DB);
  const allUsers = await db.select().from(users);
  return { users: allUsers.map((u) => u.username) };
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

export function Page({ users }: LoaderData): ComponentChild {
  return (
    <Card>
      <h1>Admin</h1>
      <div className="contents">
        <p>Users:</p>
        <ul>
          {users.map((username) => (
            <li key={username}>{username}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
