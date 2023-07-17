/*
  Warnings:

  - Added the required column `sets` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "sets" INTEGER NOT NULL;
