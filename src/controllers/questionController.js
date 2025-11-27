import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE multiple questions
export const createQuestions = async (req, res) => {
  try {
    const { idSurvey, listPertanyaan } = req.body;

    if (!idSurvey || !listPertanyaan) {
      return res.status(400).json({ message: "idSurvey & listPertanyaan required" });
    }

    const created = await prisma.$transaction(
      listPertanyaan.map((q) =>
        prisma.pertanyaan.create({
          data: {
            surveyId: Number(idSurvey),
            tipe: q.tipe,
            teks: q.teks,
            urutan: q.urutan,
            opsi: q.opsi ? JSON.stringify(q.opsi) : null
          }
        })
      )
    );

    res.status(201).json({
      message: "Pertanyaan berhasil dibuat",
      data: {
        id: idSurvey,
        idSurvey,
        listPertanyaan: created.map(q => ({
          tipe: q.tipe,
          teks: q.teks,
          urutan: q.urutan,
          opsi: q.opsi ? JSON.parse(q.opsi) : undefined
        }))
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET questions by survey
export const getQuestionsBySurvey = async (req, res) => {
  try {
    const surveyId = Number(req.params.surveyId);

    const list = await prisma.pertanyaan.findMany({
      where: { surveyId },
      orderBy: { urutan: "asc" }
    });

    res.json({
      id: surveyId,
      idSurvey: surveyId,
      listPertanyaan: list.map(q => ({
        tipe: q.tipe,
        teks: q.teks,
        urutan: q.urutan,
        opsi: q.opsi ? JSON.parse(q.opsi) : undefined
      }))
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single question
export const getQuestion = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const q = await prisma.pertanyaan.findUnique({ where: { id }});
    if (!q) return res.status(404).json({ message: "Pertanyaan tidak ditemukan" });

    res.json({
      id: q.id,
      idSurvey: q.surveyId,
      tipe: q.tipe,
      teks: q.teks,
      urutan: q.urutan,
      opsi: q.opsi ? JSON.parse(q.opsi) : undefined
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateQuestion = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { tipe, teks, urutan, opsi } = req.body;

    const updated = await prisma.pertanyaan.update({
      where: { id },
      data: {
        tipe,
        teks,
        urutan,
        opsi: opsi ? JSON.stringify(opsi) : null
      }
    });

    res.json({
      message: "Pertanyaan berhasil diupdate",
      data: {
        id: updated.id,
        tipe: updated.tipe,
        teks: updated.teks,
        urutan: updated.urutan,
        opsi: updated.opsi ? JSON.parse(updated.opsi) : undefined
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteQuestion = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.pertanyaan.delete({ where: { id }});

    res.json({ message: "Pertanyaan berhasil dihapus" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
