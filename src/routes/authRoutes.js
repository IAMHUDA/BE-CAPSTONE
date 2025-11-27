import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/profile", authMiddleware, getProfile);

// Contoh – route khusus admin
router.get("/admin-area", authMiddleware, adminOnly, (req, res) => {
  res.json({ message: "Welcome ADMIN!" });
});

export default router;
