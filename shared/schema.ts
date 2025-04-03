import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const scriptFunctions = pgTable("script_functions", {
  id: serial("id").primaryKey(),
  creatorName: text("creator_name").notNull(),
  functionName: text("function_name").notNull(),
  beforeHex: text("before_hex").notNull(),
  afterHex: text("after_hex").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertScriptFunctionSchema = createInsertSchema(scriptFunctions).pick({
  creatorName: true,
  functionName: true,
  beforeHex: true,
  afterHex: true,
});

export const scriptFunctionSchema = z.object({
  creatorName: z.string().min(1, "作成者名は必須です"),
  functionName: z.string().min(1, "機能名は必須です"),
  beforeHex: z.string().min(1, "書き換え前のHEXコードは必須です").regex(/^[0-9A-Fa-f]+$/, "HEXコードは16進数で入力してください (0-9, A-F)"),
  afterHex: z.string().min(1, "書き換え後のHEXコードは必須です").regex(/^[0-9A-Fa-f]+$/, "HEXコードは16進数で入力してください (0-9, A-F)"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertScriptFunction = z.infer<typeof insertScriptFunctionSchema>;
export type ScriptFunction = typeof scriptFunctions.$inferSelect;
