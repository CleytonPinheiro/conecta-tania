import { 
  type User, type InsertUser,
  type Turma, type InsertTurma,
  type Projeto, type InsertProjeto,
  users, turmas, projetos
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
}

export const storage = new DatabaseStorage();
