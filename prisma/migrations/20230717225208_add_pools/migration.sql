/*
  Warnings:

  - You are about to drop the column `seedingConsolation` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `seedingPlayoffs` on the `Tournament` table. All the data in the column will be lost.
  - Added the required column `pools` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seeding` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "seedingConsolation",
DROP COLUMN "seedingPlayoffs",
ADD COLUMN     "pools" JSONB NOT NULL,
ADD COLUMN     "seeding" JSONB NOT NULL;
