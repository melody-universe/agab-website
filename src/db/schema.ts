import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const acronyms = sqliteTable("acronyms", {
  id: integer().primaryKey({ autoIncrement: true }),
  content: text({ mode: "json" }).notNull(),
});
