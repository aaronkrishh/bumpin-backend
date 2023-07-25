import {Request, Response} from "express";
import {
    createTournament,
    getTournament,
    getTournaments,
    updateTournament,
    UpdateTournamentData
} from "../db/Tournament";
import {createScore} from "../db/Score";
import {getTeamsForTournament, initializeTeams} from "../db/Team";


async function createTournamentHandler(req: Request, res: Response){
    let {name, teamCount, poolsCount} = req.body.tournament
    let tournament = await createTournament(name, teamCount, poolsCount)
    await initializeTeams(tournament)

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
    let teams = await getTeamsForTournament(tournamentId)

    res.status(200).send({
        'tournament': tournament,
        'teams': teams,
    })
}

async function addScoreHandler(req: Request, res: Response){
    let tournamentId = Number(req.params.id)
    let {teamAId, teamBId, teamAPoints, teamBPoints, gameType} = req.body.score

    let score = await createScore(
        tournamentId,
        teamAId,
        teamBId,
        teamAPoints,
        teamBPoints,
        gameType
    )

    res.status(200).send({
        'score': score
    })
}

async function updateStageHandler(req: Request, res: Response) {
    let tournamentId = Number(req.params.id)
    let data: UpdateTournamentData = {stage: req.body.stage}
    let tournament = await updateTournament(tournamentId, data)

    res.status(200).send({
        'tournament': tournament
    })
}

async function updateTournamentNameHandler(req: Request, res: Response) {
    let tournamentId = Number(req.params.id)
    let data: UpdateTournamentData = {name: req.body.name}
    let tournament = await updateTournament(tournamentId, data)

    res.status(200).send({
        'tournament': tournament
    })
}


export { createTournamentHandler, getTournamentsHandler, addScoreHandler, updateStageHandler, getTournamentHandler, updateTournamentNameHandler }