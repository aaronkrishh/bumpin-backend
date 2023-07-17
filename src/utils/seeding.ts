import {getTournament} from "../models/Tournament";
import {getTournamentPoolScores} from "../models/Score";

async function computeSeeding(tournamentId: number) {
    const tournament = await getTournament(tournamentId)

    let counts: any = {}
    tournament.teamNames.forEach(name => {
        counts[name] = {sets: 0, scoreDiff: 0}
    })

    let scores = await getTournamentPoolScores(tournamentId)
    scores.forEach(score => {
        counts[score.winner].sets += 1
        let diff = 0
        for (let i = 0; i < score.sets; i++) {
            diff += (score.teamAScores[i] - score.teamBScores[i])
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

    let seeding: string[] = sortable.map((data: any) => data[0])

}

export { computeSeeding }
