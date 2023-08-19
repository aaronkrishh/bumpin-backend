import {GameType, MatchState, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

async function createMatch(tournamentId: number,
                           name: string,
                           gameType: GameType,
                           nextMatchId?: number,
                           teamAId?: number,
                           teamBId?: number,
                           state: MatchState = MatchState.SCHEDULED,) {
    const match = await prisma.match.create({
        //@ts-ignore
        data: {
            tournamentId,
            name,
            gameType,
            state,
            teamAId,
            teamBId,
            nextMatchId
        }
    });

    return match;
}

async function getMatch(id: number) {
    const match = await prisma.match.findUniqueOrThrow({
        where: {
            id: id,
        }
    })
    return match
}

async function getMatchesByTournamentId(tournamentId: number) {
    const matches = await prisma.match.findMany({
        where: {
            tournamentId: tournamentId
        },
        include: {
            teamA: true,
            teamB: true,
            score: {
                include: {
                    teamA: true,
                    teamB: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return matches
}

interface UpdateMatchData {
    scoreId?: number
    teamAId?: number
    teamBId?: number
}


async function updateMatch(matchId: number, data: UpdateMatchData) {
    const match = await prisma.match.update({
        where: { id: matchId },
        data: data
    })
    return match
}



export { createMatch, getMatch, getMatchesByTournamentId, updateMatch }
