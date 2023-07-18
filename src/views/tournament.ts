import {Request, Response} from "express";
import {createTournament, getTournament, getTournaments, updateStage} from "../models/Tournament";
import {createScore} from "../models/Score";


async function createTournamentHandler(req: Request, res: Response){
    let {name, teamCount} = req.body.tournament
    let tournament = await createTournament(name, teamCount)

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

async function getTournamentHandler(req: Request, res: Response){
    let tournamentId = Number(req.params.id)
    let tournament = await getTournament(tournamentId)

    res.status(200).send({
        'tournament': tournament
    })
}

async function addScoreHandler(req: Request, res: Response){
    let tournamentId = Number(req.params.id)
    let {teamA, teamB, teamAScores, teamBScores, gameType} = req.body.score

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

async function updateStageHandler(req: Request, res: Response) {
    let tournamentId = Number(req.params.id)
    let tournament = await updateStage(tournamentId, req.body.stage)

    res.status(200).send({
        'tournament': tournament
    })
}


export { createTournamentHandler, getTournamentsHandler, addScoreHandler, updateStageHandler, getTournamentHandler }