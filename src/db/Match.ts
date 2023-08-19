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

export { createMatch }
