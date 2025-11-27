import express from "express";
import multer from "multer";
import {
  createUMKM,
  getUMKMs,
  getUMKM,
  updateUMKM,
  deleteUMKM
} from "../controllers/umkmController.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// Pastikan folder uploads ada
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Folder uploads created successfully");
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Gunakan path absolut
  },
  filename: function (req, file, cb) {
    // Bersihkan nama file dari karakter khusus
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, Date.now() + "-" + cleanName);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
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