-- CreateTable
CREATE TABLE `UMKM` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaUsaha` VARCHAR(191) NOT NULL,
    `namaPemilik` VARCHAR(191) NOT NULL,
    `tahunBerdiri` INTEGER NULL,
    `jumlahKaryawan` INTEGER NULL,
    `jangkauanPemasaran` VARCHAR(191) NULL,
    `fotoProduk` VARCHAR(191) NULL,
    `dokumenIzin` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
