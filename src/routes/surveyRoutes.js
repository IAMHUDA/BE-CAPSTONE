import express from "express";
import {
  createSurvey,
  getSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
  getSurveyAnswer
} from "../controllers/surveyController.js";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// semua user bisa lihat daftar survey
router.get("/", getSurveys);


// admin create/update/delete
router.post("/", authMiddleware, adminOnly, createSurvey);
router.put("/:id", authMiddleware, adminOnly, updateSurvey);
router.delete("/:id", authMiddleware, adminOnly, deleteSurvey);
// Ambil survey by id + pertanyaan + jawaban
router.get("/:id", authMiddleware, adminOnly, getSurveyAnswer);

export default router;
