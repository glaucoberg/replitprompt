import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateOptimizedPrompt, type PromptGenerationInput } from "./gemini";
import { insertPromptSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Generate prompt endpoint
  app.post("/api/prompts/generate", async (req, res) => {
    try {
      const { useCase, targetAudience, tone, contextInfo, constraints, title } = req.body;

      // Validate required fields
      if (!useCase || !targetAudience || !tone || !title) {
        return res.status(400).json({ 
          message: "Missing required fields: useCase, targetAudience, tone, and title are required" 
        });
      }

      // Generate prompt using Gemini
      const input: PromptGenerationInput = {
        useCase,
        targetAudience,
        tone,
        contextInfo,
        constraints,
      };

      const generatedPrompt = await generateOptimizedPrompt(input);

      // Save to database
      const promptData = {
        title,
        useCase,
        targetAudience,
        tone,
        contextInfo: contextInfo || null,
        constraints: constraints || null,
        generatedPrompt,
      };

      const savedPrompt = await storage.createPrompt(promptData);

      res.json(savedPrompt);
    } catch (error) {
      console.error("Error generating prompt:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to generate prompt" 
      });
    }
  });

  // Get all prompts (history)
  app.get("/api/prompts", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const prompts = await storage.getPrompts(limit);
      res.json(prompts);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      res.status(500).json({ 
        message: "Failed to fetch prompts" 
      });
    }
  });

  // Get single prompt by ID
  app.get("/api/prompts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const prompt = await storage.getPromptById(id);
      
      if (!prompt) {
        return res.status(404).json({ message: "Prompt not found" });
      }
      
      res.json(prompt);
    } catch (error) {
      console.error("Error fetching prompt:", error);
      res.status(500).json({ 
        message: "Failed to fetch prompt" 
      });
    }
  });

  return httpServer;
}
