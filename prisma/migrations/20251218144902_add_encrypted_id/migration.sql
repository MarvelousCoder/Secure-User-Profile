/*
  Warnings:

  - You are about to drop the column `encryptedGovId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - Added the required column `encryptedId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "encryptedGovId",
DROP COLUMN "passwordHash",
ADD COLUMN     "encryptedId" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
