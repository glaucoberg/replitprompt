import { type User, type InsertUser, type Prompt, type InsertPrompt, users, prompts } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Prompt methods
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
  getPrompts(limit?: number): Promise<Prompt[]>;
  getPromptById(id: string): Promise<Prompt | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Prompt methods
  async createPrompt(insertPrompt: InsertPrompt): Promise<Prompt> {
    const result = await db.insert(prompts).values(insertPrompt).returning();
    return result[0];
  }

  async getPrompts(limit: number = 50): Promise<Prompt[]> {
    return await db.select().from(prompts).orderBy(desc(prompts.createdAt)).limit(limit);
  }

  async getPromptById(id: string): Promise<Prompt | undefined> {
    const result = await db.select().from(prompts).where(eq(prompts.id, id)).limit(1);
    return result[0];
  }
}

export const storage = new DatabaseStorage();
