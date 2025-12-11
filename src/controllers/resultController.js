import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// POST jawaban satu survey
export const submitJawaban = async (req, res) => {
  try {
    const { surveyId, jawaban } = req.body;

    if (!surveyId || !jawaban || !Array.isArray(jawaban)) {
      return res.status(400).json({ message: "surveyId & jawaban array required" });
    }

    // Map jawaban untuk createMany
    const jawabanData = jawaban.map(j => ({
      pertanyaanId: Number(j.pertanyaanId),
      surveyId: Number(surveyId),
      jawaban: j.jawaban
    }));

    const result = await prisma.jawaban.createMany({ data: jawabanData });

    res.status(201).json({
      message: "Jawaban berhasil disimpan",
      inserted: result.count
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET jawaban per survey
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
