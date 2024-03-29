import {Team} from "@prisma/client";
import {getTeamsForTournament, updateTeam} from "../db/Team";
import {getTournamentScores} from "../db/Score";

async function computePlayoffSeeding(tournamentId: number) {
    let teams = await getTeamsForTournament(tournamentId)
    let scores = await getTournamentScores(tournamentId, true)

    let record: {[id: number]: {setsWon: number, pointsDiff: number}} = {}

    teams.forEach(team => {
        record[team.id] = {
            setsWon: 0,
            pointsDiff: 0
        }
    })

    scores.forEach(score => {
        if (score.teamA.pool !== score.teamB.pool) {
            throw new Error(`Pool Play scores exist between teams in different pools. Score ID: ${score.id}`)
        }
        if (score.winner === "A") {
            record[score.teamA.id].setsWon += 1
        } else {
            record[score.teamB.id].setsWon += 1
        }

        let diff = 0
        for (let i = 0; i < score.sets; i++) {
            diff += (score.teamAPoints[i] - score.teamBPoints[i])
        }
        record[score.teamA.id].pointsDiff += diff
        record[score.teamB.id].pointsDiff -= diff
    })

    let poolATeams = teams.filter(team => team.pool === "A")
    let poolBTeams = teams.filter(team => team.pool === "B")

    const sortTeamsFn = (tx: Team, ty: Team) => {
        if (record[tx.id].setsWon < record[ty.id].setsWon) {
            return 1
        }
        if (record[tx.id].setsWon > record[ty.id].setsWon) {
            return -1
        }
        return record[ty.id].pointsDiff - record[tx.id].pointsDiff
    }

    poolATeams.sort(sortTeamsFn)
    poolBTeams.sort(sortTeamsFn)

    const updateSeeds = async (poolTeams: Team[]) => {
        for (const [index, team] of poolTeams.entries()) {
            let seed = index + 1
            await updateTeam(team.id, {seed: seed})
        }
    }

    await updateSeeds(poolATeams)
    await updateSeeds(poolBTeams)
}

export { computePlayoffSeeding }
