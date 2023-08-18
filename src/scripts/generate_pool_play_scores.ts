import {GameType} from "@prisma/client";
import {getTeamsForTournament} from "../db/Team";
import {createScore} from "../db/Score";
import {getRandomBoolean, getRandomInt} from "../utils/random";


async function generatePoolPlayScores(tournamentId: number) {
    const teams = await getTeamsForTournament(tournamentId)

    for (let i = 0; i < teams.length - 1; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            let teamA = teams[i]
            let teamB = teams[j]

            if (teamA.pool !== teamB.pool) {
                continue
            }

            let scoreA: number, scoreB: number;

            if (getRandomBoolean()) {
                scoreA = 25
                scoreB = getRandomInt(9, 23)
            } else {
                scoreA = getRandomInt(9, 23)
                scoreB = 25
            }
            await createScore(
                tournamentId,
                teamA.id,
                teamB.id,
                [scoreA],
                [scoreB],
                1,
                GameType.POOL,
            )
        }
    }
}

console.log("Starting script of generating pool play scores")
generatePoolPlayScores(4)
    .then(() => {
        console.log("Finished generating pool play scores")
    })
    .catch(err => {
        console.log("Something went wrong.")
        console.log({err})
    })

