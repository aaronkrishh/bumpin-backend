import express from 'express';
import {
    addScoreHandler,
    createTournamentHandler,
    getTournamentHandler,
    getTournamentsHandler,
    updateStageHandler
} from "./views/tournament";

require('dotenv').config();

let cors = require('cors')
const app = express();
const port = 4000;

let whitelist = ["https://bumpinsports.netlify.app/"]
if (process.env.NODE_ENV == "dev") {
    whitelist.push("http://localhost:3000")
}
const corsOptions = {
    origin: whitelist
}
app.use(cors(corsOptions))
app.use(express.json()) // for parsing application/json

app.get('/', (req, res) => {
    res.send('Hello world')
})


app.post('/login', (req, res) => {
    if (req.body.password == "bumpin") {
        res.status(200).send({'status': 'Authorized'})
        return
    }
    res.status(403).send({'status': 'Unauthorized'})
})

app.post('/tournament', createTournamentHandler)
app.get('/tournament', getTournamentsHandler)
app.get('/tournament/:id', getTournamentHandler)
app.post('/tournament/:id/add-score', addScoreHandler)
app.post('/tournament/:id/update-stage', updateStageHandler)

app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`)
})
