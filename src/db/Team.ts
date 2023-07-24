import {Pool, PrismaClient, Tournament} from "@prisma/client";

const prisma = new PrismaClient()

const numToPool = (number: number, poolCount: number): Pool => {
    let mod = number % poolCount
    if (mod == 0) return Pool.A
    if (mod == 1) return Pool.B
    if (mod == 2) return Pool.C
    return Pool.D
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

export { initializeTeams }
