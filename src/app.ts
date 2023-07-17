import express from 'express';
import {addScoreHandler, createTournamentHandler, getTournamentsHandler, updateStageHandler} from "./views/tournament";

const app = express();
const port = 4000;

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
app.post('/tournament/:id/add-score', addScoreHandler)
app.post('/tournament/:id/update-stage', updateStageHandler)

app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`)
})
