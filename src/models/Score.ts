import {PrismaClient, GameType} from '@prisma/client'
import type {Score} from "@prisma/client";

const prisma = new PrismaClient()

const computeWinner = (teamA: string,
                       teamB: string,
                       teamAScores: number[],
                       teamBScores: number[]) => {
    let diff: number = 0
    for (let i = 0; i < teamAScores.length; i++) {
        if (teamAScores[i] > teamBScores[i]) {
            diff += 1
        } else {
            diff -= 1
        }
    }

    if (diff > 0) return teamA
    return teamB
}

async function createScore(tournamentId: number,
                           teamA: string,
                           teamB: string,
                           teamAScores: number[],
                           teamBScores: number[],
                           gameType: GameType): Promise<Score> {

    const winner = computeWinner(teamA, teamB, teamAScores, teamBScores)
    const score = await prisma.score.create({
        data: {
            tournamentId,
            teamA,
            teamB,
            teamAScores,
            teamBScores,
            gameType,
            winner
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
