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
router.post("/", authMiddleware, createSurvey);
router.put("/:id", authMiddleware,  updateSurvey);
router.delete("/:id", authMiddleware,  deleteSurvey);
// Ambil survey by id + pertanyaan + jawaban
router.get("/:id", getSurveyAnswer);

export default router;
