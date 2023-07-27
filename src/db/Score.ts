import {PrismaClient, GameType, WinnerTeam} from '@prisma/client'
import type {Score} from "@prisma/client";

const prisma = new PrismaClient()

const computeWinner = (teamAId: number,
                       teamBId: number,
                       teamAPoints: number[],
                       teamBPoints: number[],
                       sets: number):WinnerTeam => {
    let diff: number = 0
    for (let i = 0; i < sets; i++) {
        if (teamAPoints[i] > teamBPoints[i]) {
            diff += 1
        } else {
            diff -= 1
        }
    }

    if (diff > 0) return WinnerTeam.A
    return WinnerTeam.B
}

const validateSetCount = (teamAPoints: number[],
                          teamBPoints: number[],
                          sets: number): boolean => {
    return ((teamAPoints.length === teamBPoints.length)  && (teamAPoints.length === sets))
}

async function createScore(tournamentId: number,
                           teamAId: number,
                           teamBId: number,
                           teamAPoints: number[],
                           teamBPoints: number[],
                           sets: number,
                           gameType: GameType): Promise<Score> {
    const isValid = validateSetCount(teamAPoints, teamBPoints, sets)
    if (!isValid) throw Error("Failed to create Score object, set count is contradictory.")

    const winner = computeWinner(teamAId, teamBId, teamAPoints, teamBPoints, sets)
    const score = await prisma.score.create({
        data: {
            tournamentId,
            teamAId,
            teamBId,
            teamAPoints,
            teamBPoints,
            gameType,
            winner,
            sets,
        },
    });

    return score;
}

async function getTournamentScores(tournamentId: number): Promise<Score[]>  {
    const scores = await prisma.score.findMany({
        where: {
            tournamentId: tournamentId,
        },
        include: {
            teamA: true,
            teamB: true,
        }
    })
    return scores
}

export { createScore, getTournamentScores }
