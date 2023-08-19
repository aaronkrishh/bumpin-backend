import {getTeamsForTournament} from "../db/Team";
import {createMatch} from "../db/Match";
import {GameType} from "@prisma/client";


async function createTopEightPlayoffMatches(tournamentId: number) {
    let teams = await getTeamsForTournament(tournamentId)

    const sortedTeams = teams.sort((a , b) => {
        let aSeed = a.seed as number
        let bSeed = b.seed as number
        return aSeed - bSeed
    })

    let quarterFinalMatchups = [
        [sortedTeams[0].id, sortedTeams[7].id],
        [sortedTeams[3].id, sortedTeams[4].id],
        [sortedTeams[2].id, sortedTeams[5].id],
        [sortedTeams[1].id, sortedTeams[6].id],
    ]

    let finalMatch = await createMatch(tournamentId, "Finals", GameType.FINALS)
    let semiFinalMatch1 = await createMatch(tournamentId, "SF 1", GameType.SEMIS, finalMatch.id)
    let semiFinalMatch2 = await createMatch(tournamentId, "SF 2", GameType.SEMIS, finalMatch.id)

    for (let i = 0; i < 4; i++) {
        let matchup = quarterFinalMatchups[i]
        let [teamAId, teamBId] = matchup
        let nextMatchId: number;
        if (i < 2) {
            nextMatchId = semiFinalMatch1.id
        } else {
            nextMatchId = semiFinalMatch2.id
        }
        await createMatch(tournamentId, `QF${i+1}`, GameType.QUARTERS, nextMatchId, teamAId, teamBId)
    }
}


export { createTopEightPlayoffMatches }
