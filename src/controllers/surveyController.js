import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ===============================
// CREATE SURVEY
// ===============================
export const createSurvey = async (req, res) => {
  try {
    const { namaSurvey, deskripsi } = req.body;

    if (!namaSurvey) {
      return res.status(400).json({ message: "namaSurvey required" });
    }

    const userId = req.user.userId; // AMBIL DARI TOKEN

    const survey = await prisma.survey.create({
      data: {
        namaSurvey,
        deskripsi,
        userId
      }
    });

    res.status(201).json({
      message: "Survey berhasil dibuat",
      data: survey
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===============================
// LIST ALL SURVEYS
// ===============================
export const getSurveys = async (req, res) => {
  try {
    const surveys = await prisma.survey.findMany({
      include: {
        _count: { select: { pertanyaan: true } }
      },
      orderBy: { tanggalDibuat: "desc" }
    });

    if (surveys.length === 0) {
      return res.status(200).json({
        message: "Belum ada survey yang dibuat",
        data: []
      });
    }

    res.json({
      message: "Berhasil mengambil data survey",
      data: surveys
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// GET SINGLE SURVEY + QUESTIONS + JAWABAN
// ===============================
export const getSurveyAnswer = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const survey = await prisma.survey.findUnique({
      where: { id },
      include: {
        pertanyaan: {
          orderBy: { urutan: "asc" }
        },
        jawaban: {
          orderBy: { id: "asc" }, // urutkan jawaban berdasarkan id
          include: {
            pertanyaan: {
              select: {
                teks: true,
                tipe: true,
                urutan: true
              }
            }
          }
        }
      }
    });

    if (!survey) {
      return res.status(404).json({ message: "Survey tidak ditemukan" });
    }

    // Format jawaban per responden (opsional jika ingin digroup per responden nanti)
    const jawabanFormatted = survey.jawaban.map(j => ({
      id: j.id,
      jawaban: j.jawaban,
      pertanyaan: j.pertanyaan
    }));

    res.json({
      message: "Berhasil mengambil detail survey beserta jawaban",
      data: {
        id: survey.id,
        namaSurvey: survey.namaSurvey,
        deskripsi: survey.deskripsi,
        tanggalDibuat: survey.tanggalDibuat,
        pertanyaan: survey.pertanyaan.map(p => ({
          id: p.id,
          teks: p.teks,
          tipe: p.tipe,
          urutan: p.urutan,
          opsi: p.opsi ? JSON.parse(p.opsi) : undefined
        })),
        jawaban: jawabanFormatted
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// GET SINGLE SURVEY + QUESTIONS
// ===============================
export const getSurveyById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const survey = await prisma.survey.findUnique({
      where: { id },
      include: {
        pertanyaan: true
      }
    });

    if (!survey) {
      return res.status(404).json({ message: "Survey tidak ditemukan" });
    }

    res.json({
      message: "Berhasil mengambil detail survey",
      data: survey
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===============================
// UPDATE SURVEY (HANYA PEMILIK)
// ===============================
export const updateSurvey = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;

    const survey = await prisma.survey.findUnique({ where: { id } });

    if (!survey) {
      return res.status(404).json({ message: "Survey tidak ditemukan" });
    }

    // CEK apakah survey milik user yang login
    if (survey.userId !== userId) {
      return res.status(403).json({ message: "Tidak boleh mengubah survey orang lain" });
    }

    const { namaSurvey, deskripsi } = req.body;

    const updated = await prisma.survey.update({
      where: { id },
      data: { namaSurvey, deskripsi }
    });

    res.json({
      message: "Survey berhasil diperbarui",
      data: updated
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===============================
// DELETE SURVEY (HANYA PEMILIK)
// ===============================
export const deleteSurvey = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;

    const survey = await prisma.survey.findUnique({ where: { id } });

    if (!survey) {
      return res.status(404).json({ message: "Survey tidak ditemukan" });
    }

    // CEK kepemilikan
    if (survey.userId !== userId) {
      return res.status(403).json({ message: "Tidak boleh menghapus survey orang lain" });
    }

    await prisma.survey.delete({ where: { id } });

    res.json({ message: "Survey berhasil dihapus" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
