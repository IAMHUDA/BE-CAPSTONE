import express from "express";
import multer from "multer";
import path from "path";
import { createUMKM, getUMKMs, getUMKM, updateUMKM, deleteUMKM } from "../controllers/umkmController.js";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware.js";
import { fileURLToPath } from "url";

const router = express.Router();

// setup multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = file.fieldname + "-" + Date.now();
    cb(null, base + ext);
  }
});
const upload = multer({ storage });

// public read
router.get("/", getUMKMs);
router.get("/:id", getUMKM);

// admin create (file fields: fotoProduk, dokumenIzin)
router.post("/", authMiddleware, adminOnly, upload.fields([
  { name: "fotoProduk", maxCount: 1 },
  { name: "dokumenIzin", maxCount: 1 }
]), createUMKM);

router.put("/:id", authMiddleware, adminOnly, upload.fields([
  { name: "fotoProduk", maxCount: 1 },
  { name: "dokumenIzin", maxCount: 1 }
]), updateUMKM);

router.delete("/:id", authMiddleware, adminOnly, deleteUMKM);

export default router;
