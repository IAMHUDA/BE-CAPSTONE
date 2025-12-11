import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/authRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import umkmRoutes from "./routes/umkmRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// **Serve folder uploads secara statis**
app.use("/uploads", express.static(path.join(process.cwd(), "./uploads")));

app.get("/", (req, res) => res.send("API is running..."));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/umkm", umkmRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/users", userRoutes);

export default app;
