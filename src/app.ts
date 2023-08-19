import express, {NextFunction, Request, Response} from 'express';
import {
    addPoolScoreHandler,
    createTournamentHandler,
    getTournamentHandler,
    getTournamentsHandler, shufflePoolsHandler,
    updateStageHandler,
    updateTournamentHandler
} from "./views/tournament";
import {updateTeamHandler} from "./views/team";
import {addPlayoffScoreHandler, deleteScoreHandler} from "./views/score";
require('dotenv').config();

let cors = require('cors')
const app = express();
const port = Number(process.env.PORT);

let whitelist = ["https://bumpinsports.netlify.app/", "https://bumpinsports.com/"]
if (process.env.NODE_ENV === "dev") {
    whitelist.push("http://localhost:3000")
}
const corsOptions = {
    origin: whitelist
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).send({
        "error": "Internal Server Error",
    })
}

app.use(cors(corsOptions))
app.use(express.json()) // for parsing application/json

app.get('/health', (req, res) => {
    res.send('Hello world')
})


app.post('/login', (req, res) => {
    if (req.body.password === "bumpin") {
        res.status(200).send({'status': 'Authorized'})
        return
    }
    res.status(403).send({'status': 'Unauthorized'})
})

app.post('/tournament', createTournamentHandler)
app.get('/tournament', getTournamentsHandler)
app.get('/tournament/:id', getTournamentHandler)
app.post('/tournament/:id/update', updateTournamentHandler)
app.post('/tournament/:id/shuffle-pools', shufflePoolsHandler)
app.post('/tournament/:id/add-pool-score', addPoolScoreHandler)
app.post('/tournament/:id/add-playoff-score', addPlayoffScoreHandler)
app.post('/tournament/:id/update-stage', updateStageHandler)
app.post('/team/:id/update', updateTeamHandler)

app.delete('/score/:id', deleteScoreHandler)

app.use(errorHandler)


app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`)
})
