import {Request, Response} from "express";
import {createTournament} from "../models/Tournament";


async function createTournamentHandler(req: Request, res: Response) {
    let {teamCount, teamNames} = req.body.tournament
    let tournament = await createTournament(teamCount, teamNames)

    res.status(200).send({
        'tournament': tournament
    })
}


export { createTournamentHandler }