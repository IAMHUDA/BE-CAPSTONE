import express from "express";
import {
  createQuestions,
  getQuestionsBySurvey,
  getQuestion,
  updateQuestion,
  deleteQuestion
} from "../controllers/questionController.js";

import { authMiddleware, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all questions by survey
router.get("/survey/:surveyId", getQuestionsBySurvey);

// GET single
router.get("/:id", getQuestion);

// CREATE multiple questions
router.post("/", authMiddleware, adminOnly, createQuestions);

// UPDATE
router.put("/:id", authMiddleware, adminOnly, updateQuestion);

// DELETE
router.delete("/:id", authMiddleware, adminOnly, deleteQuestion);

export default router;
