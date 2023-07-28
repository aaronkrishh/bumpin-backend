import {PrismaClient} from '@prisma/client'
import type {Stage} from "@prisma/client";

const prisma = new PrismaClient()

async function createTournament(name: string,
                                teamCount: number,
                                poolsCount: number,
                                bracketType: number = 0) {
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


async function getTournaments() {
    const allTournaments = await prisma.tournament.findMany()
    return allTournaments
}

async function getTournament(id: number) {
    const tournament = await prisma.tournament.findUniqueOrThrow({
        where: {
            id: id,
        }
    })
    return tournament
}

async function updateStage(tournamentId: number, stage: Stage) {
    let tournament = await prisma.tournament.update({
        where: { id: tournamentId },
        data: { stage: stage },
    })
    return tournament
}

async function updateName(tournamentId: number, name: string) {
    let tournament = await prisma.tournament.update({
        where: { id: tournamentId },
        data: { name: name },
    })
    return tournament
}

interface UpdateTournamentData {
    name?: string,
    stage?: Stage,
}

async function updateTournament(tournamentId: number, data: UpdateTournamentData) {
    let tournament = await prisma.tournament.update({
        where: { id: tournamentId },
        data: data,
    })
    return tournament
}

export { createTournament, getTournaments, updateStage, getTournament, updateName, updateTournament }
export type { UpdateTournamentData }
