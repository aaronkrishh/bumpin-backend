import {PrismaClient} from '@prisma/client'
import type {Tournament} from "@prisma/client";

const prisma = new PrismaClient()


async function createTournament(teamCount: number,
                                teamNames: string[],
                                bracketType: number = 0): Promise<Tournament> {
    const tournament = await prisma.tournament.create({
        data: {
            teamCount,
            teamNames,
            bracketType,
        },
    });

    return tournament;
}

async function getTournaments(): Promise<Tournament[]>  {
    const allTournaments = await prisma.tournament.findMany()
    return allTournaments
}



export { createTournament, getTournaments }
