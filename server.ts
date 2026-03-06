import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("platform.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    role TEXT
  );

  CREATE TABLE IF NOT EXISTS use_cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    industry TEXT,
    business_function TEXT,
    ai_capability TEXT,
    problem_statement TEXT,
    solution_overview TEXT,
    architecture_summary TEXT,
    tools_tech TEXT,
    stage TEXT,
    business_impact TEXT,
    tags TEXT,
    contact_person TEXT,
    region TEXT,
    lat REAL,
    lng REAL
  );

  CREATE TABLE IF NOT EXISTS pocs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    team TEXT,
    dataset TEXT,
    model_type TEXT,
    results TEXT,
    lessons_learned TEXT,
    repo_link TEXT,
    reusability_score INTEGER
  );

  CREATE TABLE IF NOT EXISTS capabilities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    description TEXT,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    description TEXT,
    repo_link TEXT,
    download_link TEXT,
    tags TEXT
  );
`);

// Seed Data (if empty)
const userCount = db.prepare("SELECT count(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  db.prepare("INSERT INTO users (name, email, role) VALUES (?, ?, ?)").run("Admin User", "admin@nextai.ai", "Admin");
  
  db.prepare("INSERT INTO capabilities (name, description, icon) VALUES (?, ?, ?)").run(
    "Generative AI", "Large Language Models and creative AI solutions.", "Sparkles"
  );
  db.prepare("INSERT INTO capabilities (name, description, icon) VALUES (?, ?, ?)").run(
    "Computer Vision", "Image recognition, object detection, and visual analysis.", "Eye"
  );
  db.prepare("INSERT INTO capabilities (name, description, icon) VALUES (?, ?, ?)").run(
    "NLP", "Natural Language Processing for text analysis and translation.", "MessageSquare"
  );

  db.prepare(`INSERT INTO use_cases (title, description, industry, business_function, ai_capability, stage, business_impact, tags, contact_person, region, lat, lng) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    "Customer Support Automation", 
    "Automated ticketing and response system using LLMs.", 
    "Retail", "Customer Service", "Generative AI", "Production", 
    "40% reduction in response time", "LLM, Automation, Retail", "Jane Doe", "North America", 37.7749, -122.4194
  );

  db.prepare(`INSERT INTO pocs (name, description, team, dataset, model_type, results, reusability_score) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`).run(
    "Visual Quality Inspection", 
    "Detecting defects in manufacturing lines using CNNs.", 
    "AI Core Team", "Manufacturing Dataset V2", "ResNet-50", "98% Accuracy", 85
  );

  db.prepare(`INSERT INTO assets (name, type, description, repo_link, tags) 
    VALUES (?, ?, ?, ?, ?)`).run(
    "Enterprise LLM Wrapper", "API", "Standardized wrapper for internal LLM access.", "https://github.com/nextai/llm-wrapper", "API, LLM, Security"
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/stats", (req, res) => {
    const useCases = db.prepare("SELECT count(*) as count FROM use_cases").get() as { count: number };
    const pocs = db.prepare("SELECT count(*) as count FROM pocs").get() as { count: number };
    const capabilities = db.prepare("SELECT count(*) as count FROM capabilities").get() as { count: number };
    const assets = db.prepare("SELECT count(*) as count FROM assets").get() as { count: number };
    res.json({ 
      useCases: useCases.count, 
      pocs: pocs.count, 
      capabilities: capabilities.count, 
      assets: assets.count 
    });
  });

  app.get("/api/use-cases", (req, res) => {
    const rows = db.prepare("SELECT * FROM use_cases ORDER BY id DESC").all();
    res.json(rows);
  });

  app.get("/api/use-cases/:id", (req, res) => {
    const row = db.prepare("SELECT * FROM use_cases WHERE id = ?").get(req.params.id);
    res.json(row);
  });

  app.post("/api/use-cases", (req, res) => {
    const { title, description, industry, business_function, ai_capability, stage, business_impact, tags, contact_person, region, lat, lng } = req.body;
    const info = db.prepare(`INSERT INTO use_cases (title, description, industry, business_function, ai_capability, stage, business_impact, tags, contact_person, region, lat, lng) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(title, description, industry, business_function, ai_capability, stage, business_impact, tags, contact_person, region, lat, lng);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/pocs", (req, res) => {
    const rows = db.prepare("SELECT * FROM pocs ORDER BY id DESC").all();
    res.json(rows);
  });

  app.get("/api/capabilities", (req, res) => {
    const rows = db.prepare("SELECT * FROM capabilities").all();
    res.json(rows);
  });

  app.get("/api/assets", (req, res) => {
    const rows = db.prepare("SELECT * FROM assets ORDER BY id DESC").all();
    res.json(rows);
  });

  app.get("/api/search", (req, res) => {
    const q = `%${req.query.q || ""}%`;
    const useCases = db.prepare("SELECT 'use-case' as type, id, title as name, description FROM use_cases WHERE title LIKE ? OR description LIKE ? OR tags LIKE ?").all(q, q, q);
    const pocs = db.prepare("SELECT 'poc' as type, id, name, description FROM pocs WHERE name LIKE ? OR description LIKE ?").all(q, q);
    const assets = db.prepare("SELECT 'asset' as type, id, name, description FROM assets WHERE name LIKE ? OR description LIKE ? OR tags LIKE ?").all(q, q, q);
    res.json([...useCases, ...pocs, ...assets]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
