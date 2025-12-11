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
router.post("/", authMiddleware, createQuestions);

// UPDATE
router.put("/:id", authMiddleware,  updateQuestion);

// DELETE
router.delete("/:id", authMiddleware, deleteQuestion);

export default router;
