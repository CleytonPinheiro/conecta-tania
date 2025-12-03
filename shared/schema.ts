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

// Horta media table
export const hortaMidias = pgTable("horta_midias", {
  id: serial("id").primaryKey(),
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  tipo: text("tipo").notNull(), // 'video' ou 'foto'
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
});

export const insertHortaMidiaSchema = createInsertSchema(hortaMidias).omit({ id: true }).extend({
  thumbnailUrl: z.string().optional().nullable(),
  descricao: z.string().optional().nullable(),
});
export type InsertHortaMidia = z.infer<typeof insertHortaMidiaSchema>;
export type HortaMidia = typeof hortaMidias.$inferSelect;

// Horta Rega Control table (Sistema de Rega Smart)
export const hortaRegaControl = pgTable("horta_rega_control", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull().default("Sistema de Rega"),
  statusAtivo: text("status_ativo").notNull().default("desligado"), // 'ligado' ou 'desligado'
  umidadeAtual: integer("umidade_atual").default(0),
  ultimaAtualizacao: text("ultima_atualizacao"),
});

export const insertHortaRegaControlSchema = createInsertSchema(hortaRegaControl).omit({ id: true });
export type InsertHortaRegaControl = z.infer<typeof insertHortaRegaControlSchema>;
export type HortaRegaControl = typeof hortaRegaControl.$inferSelect;

// Horta Rega Schedule table (Agendamentos)
export const hortaRegaSchedules = pgTable("horta_rega_schedules", {
  id: serial("id").primaryKey(),
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  horaLigada: text("hora_ligada").notNull(), // HH:mm
  horaDesligada: text("hora_desligada").notNull(), // HH:mm
  diasSemana: text("dias_semana").array().notNull(), // ['segunda', 'terca', ...]
  ativo: text("ativo").notNull().default("sim"), // 'sim' ou 'nao'
  criadoEm: text("criado_em"),
});

export const insertHortaRegaScheduleSchema = createInsertSchema(hortaRegaSchedules).omit({ id: true }).extend({
  descricao: z.string().optional().nullable(),
  criadoEm: z.string().optional().nullable(),
});
export type InsertHortaRegaSchedule = z.infer<typeof insertHortaRegaScheduleSchema>;
export type HortaRegaSchedule = typeof hortaRegaSchedules.$inferSelect;
