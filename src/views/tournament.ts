import {Request, Response} from "express";
import {
    createTournament,
    getTournament,
    getTournaments,
    updateTournament,
    UpdateTournamentData
} from "../db/Tournament";
import {createScore, getTournamentScores} from "../db/Score";
import {getTeamsForTournament, initializeTeams, updateTeamPools} from "../db/Team";
import {numToPool, shuffle} from "../utils/util";


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
    let scores = await getTournamentScores(tournamentId)

    res.status(200).send({
        'tournament': tournament,
        'teams': teams,
        'scores': scores,
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

async function updateTournamentHandler(req: Request, res: Response) {
    let tournamentId = Number(req.params.id)
    let data: UpdateTournamentData = {name: req.body.name}
    let tournament = await updateTournament(tournamentId, data)

    res.status(200).send({
        'tournament': tournament
    })
}

async function shufflePoolsHandler(req: Request, res: Response) {
    let tournamentId = Number(req.params.id)
    let tournament = await getTournament(tournamentId)
    let teams = await getTeamsForTournament(tournamentId)
    let teamIds = teams.map(team => team.id)
    shuffle(teamIds)

    let teamsPerPool = tournament.teamCount / tournament.poolsCount
    for (let i = 0; i < tournament.poolsCount; i++) {
        let teamsToUpdate = teamIds.slice(i*teamsPerPool, (i+1)*teamsPerPool)
        await updateTeamPools(teamsToUpdate, numToPool(i, tournament.poolsCount))
    }

    teams = await getTeamsForTournament(tournamentId)
    res.status(200).send({
        'tournament': tournament,
        'teams': teams
    })
}


export { createTournamentHandler, getTournamentsHandler, addScoreHandler, updateStageHandler, getTournamentHandler,
    updateTournamentHandler, shufflePoolsHandler }