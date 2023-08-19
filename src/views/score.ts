import {Request, Response} from "express";
import {createScore, deleteScore} from "../db/Score";
import {getMatch, updateMatch} from "../db/Match";
import {GameType, Match} from "@prisma/client";
import {getWinnerId} from "../utils/util";


async function deleteScoreHandler(req: Request, res: Response) {
    let scoreId = Number(req.params.id)
    await deleteScore(scoreId)
    res.sendStatus(200)
}


function validateMatchScoreFields(match: Match, teamAId: number, teamBId: number, gameType: GameType) {
    const teamsCorrect = ((match.teamAId === teamAId && match.teamBId === teamBId) ||
        (match.teamAId === teamBId && match.teamBId === teamAId))
    return teamsCorrect && match.gameType === gameType;


}

async function addPlayoffScoreHandler(req: Request, res: Response){
    let tournamentId = Number(req.params.id)
    let { matchId, gameType, teamAId, teamBId, teamAPoints, teamBPoints, sets } = req.body.score

    let match = await getMatch(matchId)
    if (!validateMatchScoreFields(match, teamAId, teamBId, gameType)) {
        throw Error("validateMatchScoreFields failed")
    }

    let tAid = teamAId
    let tBid = teamBId
    if (match.teamAId !== teamAId) {
        tAid = teamBId
        tBid = teamAId
    }

    let score = await createScore(
        tournamentId,
        tAid,
        tBid,
        teamAPoints,
        teamBPoints,
        sets,
        gameType,
    )

    await updateMatch(matchId, { scoreId: score.id })

    if (match.nextMatchId) {
        let nextMatch = await getMatch(match.nextMatchId)
        const winnerTeamId = getWinnerId(score)

        if (nextMatch.teamAId) {
            await updateMatch(nextMatch.id, { teamBId: winnerTeamId })
        } else {
            await updateMatch(nextMatch.id, { teamAId: winnerTeamId })
        }
    }


    res.status(200).send({
        'score': score
    })
}


export { deleteScoreHandler, addPlayoffScoreHandler }

