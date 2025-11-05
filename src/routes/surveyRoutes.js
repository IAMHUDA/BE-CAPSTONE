import express from "express";
import {
  createSurvey,
  getSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey
} from "../controllers/surveyController.js";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// semua user bisa lihat daftar survey
router.get("/", getSurveys);
router.get("/:id", getSurveyById);

// admin create/update/delete
router.post("/", authMiddleware, adminOnly, createSurvey);
router.put("/:id", authMiddleware, adminOnly, updateSurvey);
router.delete("/:id", authMiddleware, adminOnly, deleteSurvey);

export default router;
