import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createQuestion = async (req, res) => {
  try {
    const { surveyId, text, order } = req.body;
    if (!surveyId || !text) return res.status(400).json({ message: "surveyId & text required" });

    const q = await prisma.question.create({
      data: { surveyId: Number(surveyId), text, order: order ? Number(order) : null }
    });
    res.status(201).json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestionsBySurvey = async (req, res) => {
  try {
    const surveyId = Number(req.params.surveyId);
    const questions = await prisma.question.findMany({
      where: { surveyId },
      orderBy: { order: "asc" }
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const q = await prisma.question.findUnique({ where: { id }});
    if (!q) return res.status(404).json({ message: "Not found" });
    res.json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { text, order } = req.body;
    const updated = await prisma.question.update({
      where: { id },
      data: { text, order: order ? Number(order) : null }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.question.delete({ where: { id }});
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
