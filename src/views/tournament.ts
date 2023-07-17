import {Request, Response} from "express";
import {createTournament, getTournaments} from "../models/Tournament";
import {createScore} from "../models/Score";


async function createTournamentHandler(req: Request, res: Response){
    let {teamCount, teamNames} = req.body.tournament
    let tournament = await createTournament(teamCount, teamNames)

    res.status(200).send({
        'tournament': tournament
    })
}


async function getTournamentsHandler(req: Request, res: Response){
    let tournaments = await getTournaments()

    res.status(200).send({
        'data': tournaments
    })
}

async function addScoreHandler(req: Request, res: Response){
    let {teamA, teamB, teamAScores, teamBScores, gameType} = req.body.score
    let tournamentId = Number(req.params.id)

    let score = await createScore(
        tournamentId,
        teamA,
        teamB,
        teamAScores,
        teamBScores,
        gameType
    )

    res.status(200).send({
        'score': score
    })
}


export { createTournamentHandler, getTournamentsHandler, addScoreHandler }