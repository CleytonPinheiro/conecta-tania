import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Turmas table
export const turmas = pgTable("turmas", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull().unique(),
  descricao: text("descricao"),
});

export const insertTurmaSchema = createInsertSchema(turmas).omit({ id: true });
export type InsertTurma = z.infer<typeof insertTurmaSchema>;
export type Turma = typeof turmas.$inferSelect;

// Projetos table
export const projetos = pgTable("projetos", {
  id: serial("id").primaryKey(),
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  categoria: text("categoria").notNull(),
  alunos: text("alunos").array().notNull(),
  turmaId: integer("turma_id").notNull().references(() => turmas.id),
  imagemUrl: text("imagem_url"),
  linkCanva: text("link_canva"),
  linkVideo: text("link_video"),
  linkGithub: text("link_github"),
  linkDemo: text("link_demo"),
});

export const insertProjetoSchema = createInsertSchema(projetos).omit({ id: true });
export type InsertProjeto = z.infer<typeof insertProjetoSchema>;
export type Projeto = typeof projetos.$inferSelect;
