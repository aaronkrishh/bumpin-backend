import {Pool, Score} from "@prisma/client";

const getWinnerId = (score: Score) => (score.winner === "A" ? score.teamAId : score.teamBId)

const numToPool = (number: number, poolCount: number): Pool => {
    let mod = number % poolCount
    if (mod === 0) return Pool.A
    if (mod === 1) return Pool.B
    if (mod === 2) return Pool.C
    return Pool.D
}

function shuffle(array: any[]) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export { shuffle, numToPool, getWinnerId }
