/*
  Warnings:

  - Added the required column `about` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "about" TEXT NOT NULL;
