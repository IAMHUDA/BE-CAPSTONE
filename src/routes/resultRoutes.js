import express from "express";
import { submitJawaban } from "../controllers/resultController.js";
import { getJawabanBySurvey } from "../controllers/resultController.js"; // pastikan function ini ada
import { deleteJawabanBySubmission } from "../controllers/resultController.js";

const router = express.Router();

// Submit jawaban
router.post("/", submitJawaban);

// Get jawaban per survey
router.get("/:surveyId", getJawabanBySurvey);

// Delete jawaban per submission
router.delete("/:submissionId", deleteJawabanBySubmission);

export default router;
