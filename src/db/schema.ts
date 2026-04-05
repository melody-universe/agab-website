import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { AcronymSerialization } from "../api/acronyms";
import { sql } from "drizzle-orm";

export const acronyms = sqliteTable("acronyms", {
  id: integer().primaryKey({ autoIncrement: true }),
  isDefault: integer({ mode: "boolean" }).default(false).notNull(),
  content: text({ mode: "json" }).$type<AcronymSerialization>().notNull(),
});

export const activationCodes = sqliteTable("activation_codes", {
  id: integer().primaryKey({ autoIncrement: true }),
  value: text().notNull(),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(current_timestamp)`),
});
