/*
  Warnings:

  - You are about to drop the column `title` on the `Experience` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[experienceId,dateTime]` on the table `Slot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Experience_title_key";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Experience_name_key" ON "Experience"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Slot_experienceId_dateTime_key" ON "Slot"("experienceId", "dateTime");
