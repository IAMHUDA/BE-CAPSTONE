import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// buat survey
export const createSurvey = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "name required" });

    const survey = await prisma.survey.create({
      data: { name, description }
    });
    res.status(201).json(survey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// list semua survey (dengan total pertanyaan)
export const getSurveys = async (req, res) => {
  try {
    const surveys = await prisma.survey.findMany({
      include: {
        _count: { select: { questions: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    // _count.questions memberikan jumlah pertanyaan
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get single survey with questions (detail)
export const getSurveyById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const survey = await prisma.survey.findUnique({
      where: { id },
      include: { questions: { orderBy: { order: "asc" } } }
    });
    if (!survey) return res.status(404).json({ message: "Survey not found" });
    res.json(survey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update survey
export const updateSurvey = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    const survey = await prisma.survey.update({
      where: { id },
      data: { name, description }
    });
    res.json(survey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete survey
export const deleteSurvey = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.survey.delete({ where: { id }});
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
