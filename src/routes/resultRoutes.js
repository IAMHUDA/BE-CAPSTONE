import express from "express";
import { submitJawaban } from "../controllers/resultController.js";
import { getJawabanBySurvey } from "../controllers/resultController.js"; // pastikan function ini ada

const router = express.Router();

// Submit jawaban
router.post("/", submitJawaban);

// Get jawaban per survey
router.get("/:surveyId", getJawabanBySurvey);

export default router;
