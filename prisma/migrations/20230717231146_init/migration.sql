-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('PREP', 'POOL', 'PLAYOFF', 'COMPLETE');

-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('POOL', 'PLAYOFF');

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamCount" INTEGER NOT NULL,
    "teamNames" TEXT[],
    "bracketType" INTEGER NOT NULL,
    "stage" "Stage" NOT NULL DEFAULT 'PREP',
    "pools" JSONB NOT NULL DEFAULT '[]',
    "seeding" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "teamA" TEXT NOT NULL,
    "teamB" TEXT NOT NULL,
    "teamAScores" INTEGER[],
    "teamBScores" INTEGER[],
    "sets" INTEGER NOT NULL,
    "gameType" "GameType" NOT NULL,
    "winner" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
