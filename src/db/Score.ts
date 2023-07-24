import {PrismaClient, GameType, WinnerTeam} from '@prisma/client'
import type {Score} from "@prisma/client";

const prisma = new PrismaClient()

const computeWinner = (teamAId: number,
                       teamBId: number,
                       teamAPoints: number[],
                       teamBPoints: number[]):WinnerTeam => {
    let diff: number = 0
    for (let i = 0; i < teamAPoints.length; i++) {
        if (teamAPoints[i] > teamBPoints[i]) {
            diff += 1
        } else {
            diff -= 1
        }
    }

    if (diff > 0) return WinnerTeam.A
    return WinnerTeam.B
}

async function createScore(tournamentId: number,
                           teamAId: number,
                           teamBId: number,
                           teamAPoints: number[],
                           teamBPoints: number[],
                           gameType: GameType): Promise<Score> {

    const winner = computeWinner(teamAId, teamBId, teamAPoints, teamBPoints)
    const sets = teamAPoints.length
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

async function getTournamentPoolScores(tournamentId: number): Promise<Score[]>  {
    const scores = await prisma.score.findMany({
        where: {
            tournamentId: tournamentId,
            gameType: GameType.POOL,
        }
    })
    return scores
}

export { createScore, getTournamentPoolScores }
