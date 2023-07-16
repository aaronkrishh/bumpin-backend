import {Request, Response} from "express";
import {createTournament, getTournaments} from "../models/Tournament";


async function createTournamentHandler(req: Request, res: Response) {
    let {teamCount, teamNames} = req.body.tournament
    let tournament = await createTournament(teamCount, teamNames)

    res.status(200).send({
        'tournament': tournament
    })
}


async function getTournamentsHandler(req: Request, res: Response) {
    let tournaments = await getTournaments()

    res.status(200).send({
        'data': tournaments
    })
}


export { createTournamentHandler, getTournamentsHandler }