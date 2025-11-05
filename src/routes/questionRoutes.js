import express from "express";
import {
  createQuestion,
  getQuestionsBySurvey,
  getQuestion,
  updateQuestion,
  deleteQuestion
} from "../controllers/questionController.js";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// get all questions for a survey
router.get("/survey/:surveyId", getQuestionsBySurvey);
router.get("/:id", getQuestion);

// admin create/update/delete
router.post("/", authMiddleware, adminOnly, createQuestion);
router.put("/:id", authMiddleware, adminOnly, updateQuestion);
router.delete("/:id", authMiddleware, adminOnly, deleteQuestion);

export default router;
