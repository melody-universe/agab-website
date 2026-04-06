import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { AcronymSerialization } from "../api/acronyms";

export const acronyms = sqliteTable("acronyms", {
  id: integer().primaryKey({ autoIncrement: true }),
  isDefault: integer({ mode: "boolean" }).default(false).notNull(),
  content: text({ mode: "json" }).$type<AcronymSerialization>().notNull(),
});

export const users = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  username: text().unique().notNull(),
  password: text().notNull(),
});
