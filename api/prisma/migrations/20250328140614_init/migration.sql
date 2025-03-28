-- CreateTable
CREATE TABLE `Aluno` (
    `ra` VARCHAR(10) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`ra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(15) NOT NULL,
    `tipo` VARCHAR(20) NOT NULL,
    `alunoRa` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atividade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `alunoRA` VARCHAR(10) NOT NULL,
    `datalmicio` DATETIME(3) NOT NULL,
    `dataEntrega` DATETIME(3) NULL,
    `nota` INTEGER NULL,
    `peso` DOUBLE NOT NULL,
    `parcial` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Telefone` ADD CONSTRAINT `Telefone_alunoRa_fkey` FOREIGN KEY (`alunoRa`) REFERENCES `Aluno`(`ra`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atividade` ADD CONSTRAINT `Atividade_alunoRA_fkey` FOREIGN KEY (`alunoRA`) REFERENCES `Aluno`(`ra`) ON DELETE CASCADE ON UPDATE CASCADE;
