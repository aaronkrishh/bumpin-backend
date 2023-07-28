import {Tournament} from "@prisma/client";
import {getTeamsForTournament} from "../db/Team";
import {getTournamentScores} from "../db/Score";

/*
    let teams = await getTeamsForTournament(tournament.id)
    let counts: any = {}
    teams.forEach(team => {
        counts[team.id] = {sets: 0, scoreDiff: 0}
    })

    let scores = await getTournamentScores(tournament.id)
    scores.forEach(score => {
        counts[score.winner].sets += 1
        let diff = 0
        for (let i = 0; i < score.sets; i++) {
            diff += (score.teamAPoints[i] - score.teamBPoints[i])
        }
        counts[score.teamA].scoreDiff += diff
        counts[score.teamB].scoreDiff -= diff
    })

    let sortable: any = []
    for (const [name, data] of Object.entries(counts)) {
        sortable.push([name, data])
    }

    sortable.sort(function(a: any, b: any) {
        if (a[1].sets > b[1].sets){
            return 1
        }
        if (a[1].sets < b[1].sets){
            return -1
        }
        return a[1].scoreDiff - b[1].scoreDiff
    });

    let seeding: Seeding = {playoffs: [], consolation: []}
    seeding.playoffs = sortable.map((data: any) => data[0])
    return seeding
 */
async function computePlayoffSeeding(tournament: Tournament) {
    let teams = await getTeamsForTournament(tournament.id)
    let scores = await getTournamentScores(tournament.id, true)

    let poolATeams = teams.filter(team => team.pool === "A")
    let poolBTeams = teams.filter(team => team.pool === "B")

    let record: {[id: number]: [setsWon: number, pointDiff: number]} = {}

    scores.forEach(score => {

    })


}

export { computePlayoffSeeding }
