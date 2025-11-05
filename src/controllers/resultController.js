import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const submitResult = async (req, res) => {
  try {
    const { surveyId, respondent, answers } = req.body;
    if (!surveyId || !answers) return res.status(400).json({ message: "surveyId & answers required" });

    // answers sebaiknya dikirim sebagai objek JSON dari frontend
    const result = await prisma.surveyResult.create({
      data: {
        surveyId: Number(surveyId),
        respondent,
        answers: answers // prisma Json
      }
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getResultsBySurvey = async (req, res) => {
  try {
    const surveyId = Number(req.params.surveyId);
    const results = await prisma.surveyResult.findMany({
      where: { surveyId },
      orderBy: { createdAt: "desc" }
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllResults = async (req, res) => {
  try {
    const results = await prisma.surveyResult.findMany({ orderBy: { createdAt: "desc" }});
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
