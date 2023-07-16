import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()


async function createTournament(teamCount: number,
                                teamNames: string[],
                                bracketType: number = 0) {
    const tournament = await prisma.tournament.create({
        data: {
            teamCount,
            teamNames,
            bracketType,
        },
    });

    return tournament;
}


export { createTournament }
