import {PrismaClient} from '@prisma/client'
import type {Tournament, Stage} from "@prisma/client";

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

async function updateSeeding(tournamentId: number, seeding: string[]): Promise<Tournament> {
    let tournament = await prisma.tournament.update({
        where: { id: tournamentId },
        data: { seedingPlayoffs: seeding },
    })
    return tournament
}

export { createTournament, getTournaments, updateStage, getTournament }
