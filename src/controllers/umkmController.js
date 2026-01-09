import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import path from "path";

export const createUMKM = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);
    
    const { namaUsaha, namaPemilik, noTelp, tahunBerdiri, jumlahKaryawan, jangkauanPemasaran, keteranganTambahan } = req.body;
    
    // Debug file upload
    if (req.files) {
      console.log("Files received:");
      if (req.files["fotoProduk"]) {
        console.log("Foto produk:", req.files["fotoProduk"][0]);
      }
      if (req.files["dokumenIzin"]) {
        console.log("Dokumen izin:", req.files["dokumenIzin"][0]);
      }
    }

    const fotoProduk = req.files && req.files["fotoProduk"] ? `/uploads/${req.files["fotoProduk"][0].filename}` : null;
    const dokumenIzin = req.files && req.files["dokumenIzin"] ? `/uploads/${req.files["dokumenIzin"][0].filename}` : null;

    console.log("Foto path:", fotoProduk);
    console.log("Dokumen path:", dokumenIzin);

    const umkm = await prisma.uMKM.create({
      data: {
        namaUsaha,
        namaPemilik,
        noTelp,
        tahunBerdiri: tahunBerdiri ? Number(tahunBerdiri) : null,
        jumlahKaryawan: jumlahKaryawan ? Number(jumlahKaryawan) : null,
        jangkauanPemasaran,
        keteranganTambahan,
        fotoProduk,
        dokumenIzin
      }
    });
    res.status(201).json(umkm);
  } catch (err) {
    console.error("Error creating UMKM:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getUMKMs = async (req, res) => {
  try {
    const list = await prisma.uMKM.findMany({ orderBy: { createdAt: "desc" }});
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUMKM = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const u = await prisma.uMKM.findUnique({ where: { id }});
    if (!u) return res.status(404).json({ message: "Not found" });
    res.json(u);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUMKM = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { namaUsaha, namaPemilik, noTelp, tahunBerdiri, jumlahKaryawan, jangkauanPemasaran, keteranganTambahan } = req.body;
    const fotoProduk = req.files && req.files["fotoProduk"] ? `/uploads/${req.files["fotoProduk"][0].filename}` : undefined;
    const dokumenIzin = req.files && req.files["dokumenIzin"] ? `/uploads/${req.files["dokumenIzin"][0].filename}` : undefined;

    const data = {
      namaUsaha,
      namaPemilik,
      noTelp,
      tahunBerdiri: tahunBerdiri ? Number(tahunBerdiri) : undefined,
      jumlahKaryawan: jumlahKaryawan ? Number(jumlahKaryawan) : undefined,
      jangkauanPemasaran,
      keteranganTambahan
    };

    if (fotoProduk !== undefined) data.fotoProduk = fotoProduk;
    if (dokumenIzin !== undefined) data.dokumenIzin = dokumenIzin;

    const updated = await prisma.uMKM.update({
      where: { id },
      data
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUMKM = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.uMKM.delete({ where: { id }});
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
