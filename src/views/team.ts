import {Request, Response} from "express";
import {updateTeam} from "../db/Team";

async function updateTeamHandler(req: Request, res: Response) {
    let teamId = Number(req.params.id)
    let team = await updateTeam(teamId, req.body.data)

    res.status(200).send({
        'team': team
    })
}

export { updateTeamHandler }
