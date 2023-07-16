import express from 'express';
import {createTournamentHandler, getTournamentsHandler} from "./views/tournament";

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
// app.post('/tournament/score', ...)
// app.post('/tournament/:id/update-status', ...)

app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`)
})
