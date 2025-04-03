import { scriptFunctions, type ScriptFunction, type InsertScriptFunction } from "@shared/schema";
import { users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Script functions
  getAllFunctions(): Promise<ScriptFunction[]>;
  getFunction(id: number): Promise<ScriptFunction | undefined>;
  createFunction(func: InsertScriptFunction): Promise<ScriptFunction>;
  deleteFunction(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private functions: Map<number, ScriptFunction>;
  private userId: number;
  private functionId: number;

  constructor() {
    this.users = new Map();
    this.functions = new Map();
    this.userId = 1;
    this.functionId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getAllFunctions(): Promise<ScriptFunction[]> {
    return Array.from(this.functions.values());
  }
  
  async getFunction(id: number): Promise<ScriptFunction | undefined> {
    return this.functions.get(id);
  }
  
  async createFunction(insertFunction: InsertScriptFunction): Promise<ScriptFunction> {
    const id = this.functionId++;
    const func: ScriptFunction = { ...insertFunction, id };
    this.functions.set(id, func);
    return func;
  }
  
  async deleteFunction(id: number): Promise<boolean> {
    return this.functions.delete(id);
  }
}

export const storage = new MemStorage();
