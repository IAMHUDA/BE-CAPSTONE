import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  createUMKM,
  getUMKMs,
  getUMKM,
  updateUMKM,
  deleteUMKM
} from "../controllers/umkmController.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder uploads di root project
const uploadsDir = path.join(__dirname, "../../uploads");

// Pastikan folder uploads ada
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Folder uploads created successfully");
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, Date.now() + "-" + cleanName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// ===============================
// ROUTES UMKM
// ===============================

// Create UMKM (support multiple files)
router.post("/", upload.fields([
  { name: "fotoProduk", maxCount: 1 },
  { name: "dokumenIzin", maxCount: 1 }
]), createUMKM);

// Get all UMKM
router.get("/", getUMKMs);

// Get UMKM by id
router.get("/:id", getUMKM);

// Update UMKM (support multiple files)
router.put("/:id", upload.fields([
  { name: "fotoProduk", maxCount: 1 },
  { name: "dokumenIzin", maxCount: 1 }
]), updateUMKM);

// Delete UMKM
router.delete("/:id", deleteUMKM);

export default router;
