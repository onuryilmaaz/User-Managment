import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// ES module'de __dirname tanımlaması
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Config
import connectDB from "./config/db.js";
import "./config/passport.js";

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // İzin verilen metodlar
    allowedHeaders: ["Content-Type", "Authorization"], // İzin verilen başlıklar
  })
);
app.use(morgan("dev"));
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Server Uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Swagger docs
const swaggerDocument = JSON.parse(fs.readFileSync("./docs/swagger.json"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ana sayfa
app.get("/", (req, res) => {
  res.json({
    message: "🚀 MERN Auth API Çalışıyor!",
    documentation: `http://localhost:${process.env.PORT || 8080}/api-docs`,
    endpoints: {
      auth: "/api/auth",
      user: "/api/user",
    },
  });
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
  console.log(`📚 API Dokümantasyonu: http://localhost:${PORT}/api-docs`);
});
