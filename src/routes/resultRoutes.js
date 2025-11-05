import express from "express";
import { submitResult, getResultsBySurvey, getAllResults } from "../controllers/resultController.js";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", submitResult); // warga bisa submit
router.get("/", authMiddleware, adminOnly, getAllResults); // admin lihat semua
router.get("/survey/:surveyId", authMiddleware, adminOnly, getResultsBySurvey);

export default router;
