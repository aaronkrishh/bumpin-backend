import {PrismaClient} from '@prisma/client'
import type {Tournament, Stage} from "@prisma/client";

const prisma = new PrismaClient()

type Seeding = {
    playoffs: string[]
    consolation: string[]
}

type Pools = string[]

async function createTournament(name: string,
                                teamCount: number,
                                poolsCount: number,
                                bracketType: number = 0): Promise<Tournament> {
    const tournament = await prisma.tournament.create({
        data: {
            name,
            teamCount,
            poolsCount,
            bracketType,
        },
    });

    return tournament;
}

async function getTournaments(): Promise<Tournament[]>  {
    const allTournaments = await prisma.tournament.findMany()
    return allTournaments
}

async function getTournament(id: number): Promise<Tournament>  {
    const tournament = await prisma.tournament.findUniqueOrThrow({
        where: {
            id: id,
        }
    })
    return tournament
}

async function updateStage(tournamentId: number, stage: Stage): Promise<Tournament> {
    let tournament = await prisma.tournament.update({
        where: { id: tournamentId },
        data: { stage: stage },
    })
    return tournament
}


export { createTournament, getTournaments, updateStage, getTournament }
export { Seeding, Pools }
