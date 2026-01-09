import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

// POST jawaban satu survey
export const submitJawaban = async (req, res) => {
  try {
    const { surveyId, jawaban } = req.body;

    if (!surveyId || !jawaban || !Array.isArray(jawaban)) {
      return res.status(400).json({ message: "surveyId & jawaban array required" });
    }

    const submissionId = uuidv4();

    // Map jawaban untuk createMany
    const jawabanData = jawaban.map(j => ({
      pertanyaanId: Number(j.pertanyaanId),
      surveyId: Number(surveyId),
      jawaban: j.jawaban,
      submissionId
    }));

    const result = await prisma.jawaban.createMany({ data: jawabanData });

    res.status(201).json({
      message: "Jawaban berhasil disimpan",
      inserted: result.count,
      submissionId
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET daftar responden (group by submissionId)
export const getRespondenList = async (req, res) => {
  try {
    const surveyId = Number(req.params.surveyId);

    const submissions = await prisma.jawaban.findMany({
      where: { 
        surveyId,
        NOT: { submissionId: null }
      },
      distinct: ['submissionId'],
      select: {
        submissionId: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const list = submissions.map((s, index) => ({
      label: `Responden ${submissions.length - index}`,
      submissionId: s.submissionId,
      tanggal: s.createdAt
    }));

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET detail jawaban per responden
export const getJawabanBySubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const jawabanList = await prisma.jawaban.findMany({
      where: { submissionId },
      select: {
        id: true,
        jawaban: true,
        pertanyaan: {
          select: {
            teks: true,
            tipe: true,
            urutan: true
          }
        }
      },
      orderBy: { pertanyaan: { urutan: "asc" } }
    });

    res.json(jawabanList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET jawaban per survey (lama, tetap dipertahankan jika perlu)
export const getJawabanBySurvey = async (req, res) => {
  try {
    const surveyId = Number(req.params.surveyId);

    const jawabanList = await prisma.jawaban.findMany({
      where: { surveyId },
      select: {
        id: true,
        jawaban: true,
        pertanyaan: {
          select: {
            teks: true,
            tipe: true,
            urutan: true
          }
        }
      },
      orderBy: { pertanyaan: { urutan: "asc" } }
    });

    res.json({
      surveyId,
      totalJawaban: jawabanList.length,
      jawabanList
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE jawaban per submission
export const deleteJawabanBySubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;

    await prisma.jawaban.deleteMany({
      where: { submissionId }
    });

    res.json({ message: `Jawaban dengan submissionId ${submissionId} berhasil dihapus` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
