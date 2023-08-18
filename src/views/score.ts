import {Request, Response} from "express";
import {deleteScore} from "../db/Score";


async function deleteScoreHandler(req: Request, res: Response) {
    let scoreId = Number(req.params.id)
    await deleteScore(scoreId)
    res.sendStatus(200)
}


export { deleteScoreHandler }

