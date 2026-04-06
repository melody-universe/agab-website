import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { AcronymSerialization } from "../api/acronyms";
import { sql } from "drizzle-orm";

export const acronyms = sqliteTable("acronyms", {
  id: integer().primaryKey({ autoIncrement: true }),
  isDefault: integer("is_default", { mode: "boolean" })
    .default(false)
    .notNull(),
  content: text({ mode: "json" }).$type<AcronymSerialization>().notNull(),
});

export const users = sqliteTable(
  "users",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    username: text().notNull(),
    password: text().notNull(),
  },
  (table) => [
    uniqueIndex("usernameUniqueIndex").on(sql`lower(${table.username})`),
  ],
);

export const sessions = sqliteTable("sessions", {
  id: text().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});
