import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { scriptFunctionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Function routes (CRUD operations)
  
  // Get all functions
  app.get("/api/functions", async (req: Request, res: Response) => {
    try {
      const functions = await storage.getAllFunctions();
      res.json(functions);
    } catch (error) {
      res.status(500).json({ message: "サーバーエラーが発生しました。" });
    }
  });
  
  // Get a specific function
  app.get("/api/functions/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "無効なIDです。" });
      }
      
      const func = await storage.getFunction(id);
      if (!func) {
        return res.status(404).json({ message: "機能が見つかりません。" });
      }
      
      res.json(func);
    } catch (error) {
      res.status(500).json({ message: "サーバーエラーが発生しました。" });
    }
  });
  
  // Create a function
  app.post("/api/functions", async (req: Request, res: Response) => {
    try {
      const validatedData = scriptFunctionSchema.parse(req.body);
      
      const newFunction = await storage.createFunction({
        creatorName: validatedData.creatorName,
        functionName: validatedData.functionName,
        beforeHex: validatedData.beforeHex,
        afterHex: validatedData.afterHex
      });
      
      res.status(201).json(newFunction);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "サーバーエラーが発生しました。" });
    }
  });
  
  // Delete a function
  app.delete("/api/functions/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "無効なIDです。" });
      }
      
      const exists = await storage.getFunction(id);
      if (!exists) {
        return res.status(404).json({ message: "機能が見つかりません。" });
      }
      
      const success = await storage.deleteFunction(id);
      if (success) {
        return res.status(200).json({ message: "機能が正常に削除されました。" });
      } else {
        return res.status(500).json({ message: "機能の削除に失敗しました。" });
      }
    } catch (error) {
      res.status(500).json({ message: "サーバーエラーが発生しました。" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
