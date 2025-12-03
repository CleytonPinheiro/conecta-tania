import { 
  type User, type InsertUser,
  type Turma, type InsertTurma,
  type Projeto, type InsertProjeto,
  type HortaMidia, type InsertHortaMidia,
  type HortaRegaControl, type InsertHortaRegaControl,
  type HortaRegaSchedule, type InsertHortaRegaSchedule,
  users, turmas, projetos, hortaMidias, hortaRegaControl, hortaRegaSchedules
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Turmas
  getTurmas(): Promise<Turma[]>;
  getTurma(id: number): Promise<Turma | undefined>;
  getTurmaByNome(nome: string): Promise<Turma | undefined>;
  createTurma(turma: InsertTurma): Promise<Turma>;
  updateTurma(id: number, turma: Partial<InsertTurma>): Promise<Turma | undefined>;
  deleteTurma(id: number): Promise<boolean>;
  
  // Projetos
  getProjetos(): Promise<Projeto[]>;
  getProjetosByTurma(turmaId: number): Promise<Projeto[]>;
  getProjeto(id: number): Promise<Projeto | undefined>;
  createProjeto(projeto: InsertProjeto): Promise<Projeto>;
  updateProjeto(id: number, projeto: Partial<InsertProjeto>): Promise<Projeto | undefined>;
  deleteProjeto(id: number): Promise<boolean>;

  // Horta Midias
  getHortaMidias(): Promise<HortaMidia[]>;
  getHortaMidia(id: number): Promise<HortaMidia | undefined>;
  createHortaMidia(midia: InsertHortaMidia): Promise<HortaMidia>;
  updateHortaMidia(id: number, midia: Partial<InsertHortaMidia>): Promise<HortaMidia | undefined>;
  deleteHortaMidia(id: number): Promise<boolean>;

  // Horta Rega Control
  getHortaRegaControl(): Promise<HortaRegaControl | undefined>;
  updateHortaRegaControl(data: Partial<InsertHortaRegaControl>): Promise<HortaRegaControl>;

  // Horta Rega Schedules
  getHortaRegaSchedules(): Promise<HortaRegaSchedule[]>;
  getHortaRegaSchedule(id: number): Promise<HortaRegaSchedule | undefined>;
  createHortaRegaSchedule(schedule: InsertHortaRegaSchedule): Promise<HortaRegaSchedule>;
  updateHortaRegaSchedule(id: number, schedule: Partial<InsertHortaRegaSchedule>): Promise<HortaRegaSchedule | undefined>;
  deleteHortaRegaSchedule(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Turmas
  async getTurmas(): Promise<Turma[]> {
    return db.select().from(turmas);
  }

  async getTurma(id: number): Promise<Turma | undefined> {
    const [turma] = await db.select().from(turmas).where(eq(turmas.id, id));
    return turma;
  }

  async getTurmaByNome(nome: string): Promise<Turma | undefined> {
    const [turma] = await db.select().from(turmas).where(eq(turmas.nome, nome));
    return turma;
  }

  async createTurma(turma: InsertTurma): Promise<Turma> {
    const [newTurma] = await db.insert(turmas).values(turma).returning();
    return newTurma;
  }

  async updateTurma(id: number, turma: Partial<InsertTurma>): Promise<Turma | undefined> {
    const [updated] = await db.update(turmas).set(turma).where(eq(turmas.id, id)).returning();
    return updated;
  }

  async deleteTurma(id: number): Promise<boolean> {
    const result = await db.delete(turmas).where(eq(turmas.id, id));
    return true;
  }

  // Projetos
  async getProjetos(): Promise<Projeto[]> {
    return db.select().from(projetos);
  }

  async getProjetosByTurma(turmaId: number): Promise<Projeto[]> {
    return db.select().from(projetos).where(eq(projetos.turmaId, turmaId));
  }

  async getProjeto(id: number): Promise<Projeto | undefined> {
    const [projeto] = await db.select().from(projetos).where(eq(projetos.id, id));
    return projeto;
  }

  async createProjeto(projeto: InsertProjeto): Promise<Projeto> {
    const [newProjeto] = await db.insert(projetos).values(projeto).returning();
    return newProjeto;
  }

  async updateProjeto(id: number, projeto: Partial<InsertProjeto>): Promise<Projeto | undefined> {
    const [updated] = await db.update(projetos).set(projeto).where(eq(projetos.id, id)).returning();
    return updated;
  }

  async deleteProjeto(id: number): Promise<boolean> {
    await db.delete(projetos).where(eq(projetos.id, id));
    return true;
  }

  // Horta Midias
  async getHortaMidias(): Promise<HortaMidia[]> {
    return db.select().from(hortaMidias);
  }

  async getHortaMidia(id: number): Promise<HortaMidia | undefined> {
    const [midia] = await db.select().from(hortaMidias).where(eq(hortaMidias.id, id));
    return midia;
  }

  async createHortaMidia(midia: InsertHortaMidia): Promise<HortaMidia> {
    const [newMidia] = await db.insert(hortaMidias).values(midia).returning();
    return newMidia;
  }

  async updateHortaMidia(id: number, midia: Partial<InsertHortaMidia>): Promise<HortaMidia | undefined> {
    const [updated] = await db.update(hortaMidias).set(midia).where(eq(hortaMidias.id, id)).returning();
    return updated;
  }

  async deleteHortaMidia(id: number): Promise<boolean> {
    await db.delete(hortaMidias).where(eq(hortaMidias.id, id));
    return true;
  }

  // Horta Rega Control
  async getHortaRegaControl(): Promise<HortaRegaControl | undefined> {
    const [control] = await db.select().from(hortaRegaControl);
    return control;
  }

  async updateHortaRegaControl(data: Partial<InsertHortaRegaControl>): Promise<HortaRegaControl> {
    const [updated] = await db.update(hortaRegaControl).set(data).returning();
    return updated;
  }

  // Horta Rega Schedules
  async getHortaRegaSchedules(): Promise<HortaRegaSchedule[]> {
    return db.select().from(hortaRegaSchedules);
  }

  async getHortaRegaSchedule(id: number): Promise<HortaRegaSchedule | undefined> {
    const [schedule] = await db.select().from(hortaRegaSchedules).where(eq(hortaRegaSchedules.id, id));
    return schedule;
  }

  async createHortaRegaSchedule(schedule: InsertHortaRegaSchedule): Promise<HortaRegaSchedule> {
    const [newSchedule] = await db.insert(hortaRegaSchedules).values(schedule).returning();
    return newSchedule;
  }

  async updateHortaRegaSchedule(id: number, schedule: Partial<InsertHortaRegaSchedule>): Promise<HortaRegaSchedule | undefined> {
    const [updated] = await db.update(hortaRegaSchedules).set(schedule).where(eq(hortaRegaSchedules.id, id)).returning();
    return updated;
  }

  async deleteHortaRegaSchedule(id: number): Promise<boolean> {
    await db.delete(hortaRegaSchedules).where(eq(hortaRegaSchedules.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
