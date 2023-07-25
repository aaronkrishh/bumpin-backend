import {Pool, PrismaClient, Team, Tournament} from "@prisma/client";
import {numToPool} from "../utils/util";

const prisma = new PrismaClient()

async function getTeamsForTournament(tournamentId: number): Promise<Team[]> {
    const teams = await prisma.team.findMany({
        where: {
            tournamentId: tournamentId
        },
        orderBy: {
            id: "asc"
        }
    })
    return teams
}


async function initializeTeams(tournament: Tournament) {
    const teamsData: any[] = []
    for (let i = 0; i < tournament.teamCount; i++){
        let name = `Team ${i+1}`
        let pool = numToPool(i, tournament.poolsCount)
        teamsData.push({
            tournamentId: tournament.id,
            name: name,
            pool: pool,
        })
    }

    await prisma.team.createMany({
        data: teamsData,
    })
}

interface UpdateTeamData {
    name?: string
    pool?: Pool
    seed?: number
}

async function updateTeam(teamId: number, data: UpdateTeamData) {
    const team = await prisma.team.update({
        where: { id: teamId },
        data: data
    })
    return team
}

async function updateTeamPools(teamIds: number[], pool: Pool) {
    await prisma.team.updateMany({
        where: { id: { in: teamIds } },
        data: {
            pool: pool
        }
    })
}


export { initializeTeams, updateTeam, getTeamsForTournament, updateTeamPools }
