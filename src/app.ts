import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/login', (req, res) => {
    res.status(403).send('Unauthorized')
})

app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`)
})
