import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTurmaSchema, insertProjetoSchema, insertHortaMidiaSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ============ TURMAS ROUTES ============
  
  // Get all turmas
  app.get("/api/turmas", async (req, res) => {
    try {
      const turmas = await storage.getTurmas();
      res.json(turmas);
    } catch (error) {
      console.error("Error fetching turmas:", error);
      res.status(500).json({ error: "Erro ao buscar turmas" });
    }
  });

  // Get turma by id
  app.get("/api/turmas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const turma = await storage.getTurma(id);
      if (!turma) {
        return res.status(404).json({ error: "Turma não encontrada" });
      }
      res.json(turma);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar turma" });
    }
  });

  // Create turma
  app.post("/api/turmas", async (req, res) => {
    try {
      const data = insertTurmaSchema.parse(req.body);
      const turma = await storage.createTurma(data);
      res.status(201).json(turma);
    } catch (error) {
      console.error("Error creating turma:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Erro ao criar turma" });
    }
  });

  // Update turma
  app.patch("/api/turmas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertTurmaSchema.partial().parse(req.body);
      const turma = await storage.updateTurma(id, data);
      if (!turma) {
        return res.status(404).json({ error: "Turma não encontrada" });
      }
      res.json(turma);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Erro ao atualizar turma" });
    }
  });

  // Delete turma
  app.delete("/api/turmas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTurma(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar turma" });
    }
  });

  // ============ PROJETOS ROUTES ============

  // Get all projetos
  app.get("/api/projetos", async (req, res) => {
    try {
      const projetos = await storage.getProjetos();
      res.json(projetos);
    } catch (error) {
      console.error("Error fetching projetos:", error);
      res.status(500).json({ error: "Erro ao buscar projetos" });
    }
  });

  // Get projetos by turma
  app.get("/api/turmas/:turmaId/projetos", async (req, res) => {
    try {
      const turmaId = parseInt(req.params.turmaId);
      const projetos = await storage.getProjetosByTurma(turmaId);
      res.json(projetos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar projetos da turma" });
    }
  });

  // Get projeto by id
  app.get("/api/projetos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const projeto = await storage.getProjeto(id);
      if (!projeto) {
        return res.status(404).json({ error: "Projeto não encontrado" });
      }
      res.json(projeto);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar projeto" });
    }
  });

  // Create projeto
  app.post("/api/projetos", async (req, res) => {
    try {
      const data = insertProjetoSchema.parse(req.body);
      const projeto = await storage.createProjeto(data);
      res.status(201).json(projeto);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Erro ao criar projeto" });
    }
  });

  // Update projeto
  app.patch("/api/projetos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertProjetoSchema.partial().parse(req.body);
      const projeto = await storage.updateProjeto(id, data);
      if (!projeto) {
        return res.status(404).json({ error: "Projeto não encontrado" });
      }
      res.json(projeto);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Erro ao atualizar projeto" });
    }
  });

  // Delete projeto
  app.delete("/api/projetos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProjeto(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar projeto" });
    }
  });

  // Get config (author info)
  app.get("/api/config", (req, res) => {
    res.json({
      author: {
        name: process.env.VITE_AUTHOR_NAME || "Autor",
        linkedin: process.env.VITE_AUTHOR_LINKEDIN || "",
      },
    });
  });

  // ============ HORTA MIDIAS ROUTES ============

  // Get all horta midias
  app.get("/api/horta-midias", async (req, res) => {
    try {
      const midias = await storage.getHortaMidias();
      res.json(midias);
    } catch (error) {
      console.error("Error fetching horta midias:", error);
      res.status(500).json({ error: "Erro ao buscar mídias" });
    }
  });

  // Get horta midia by id
  app.get("/api/horta-midias/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const midia = await storage.getHortaMidia(id);
      if (!midia) {
        return res.status(404).json({ error: "Mídia não encontrada" });
      }
      res.json(midia);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar mídia" });
    }
  });

  // Create horta midia
  app.post("/api/horta-midias", async (req, res) => {
    try {
      const data = insertHortaMidiaSchema.parse(req.body);
      const midia = await storage.createHortaMidia(data);
      res.status(201).json(midia);
    } catch (error) {
      console.error("Error creating horta midia:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Erro ao criar mídia" });
    }
  });

  // Update horta midia
  app.patch("/api/horta-midias/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertHortaMidiaSchema.partial().parse(req.body);
      const midia = await storage.updateHortaMidia(id, data);
      if (!midia) {
        return res.status(404).json({ error: "Mídia não encontrada" });
      }
      res.json(midia);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Erro ao atualizar mídia" });
    }
  });

  // Delete horta midia
  app.delete("/api/horta-midias/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteHortaMidia(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar mídia" });
    }
  });

  // Send feedback
  app.post("/api/feedback", async (req, res) => {
    try {
      const { name, email, message, type } = req.body;

      // Validar dados
      if (!name || !email || !message || !type) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar transporter (usando Gmail SMTP ou outro provedor)
      // Para produção, configure variáveis de ambiente
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "seu-email@gmail.com",
          pass: process.env.EMAIL_PASS || "sua-senha-app",
        },
      });

      const subject = `[Conecta Tânia] ${
        type === "critica"
          ? "Crítica"
          : type === "sugestao"
            ? "Sugestão"
            : "Elogio"
      }`;

      const htmlContent = `
        <h2>Novo Feedback Recebido</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tipo:</strong> ${type === "critica" ? "Crítica" : type === "sugestao" ? "Sugestão" : "Elogio"}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `;

      // Enviar email
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "noreply@conectatania.com",
        to: "cleyton.pinheiro.santos@escola.pr.gov.br",
        replyTo: email,
        subject: subject,
        html: htmlContent,
      });

      res.status(200).json({ success: true, message: "Feedback enviado com sucesso!" });
    } catch (error) {
      console.error("Error sending feedback:", error);
      res.status(500).json({ error: "Erro ao enviar feedback" });
    }
  });

  return httpServer;
}
