import express from "express";
import { submitJawaban } from "../controllers/resultController.js";
import {getSurveyAnswer} from "../controllers/surveyController.js";

const router = express.Router();

// Submit jawaban
router.post("/", submitJawaban);


export default router;
