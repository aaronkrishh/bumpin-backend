import fs from "fs";
import {Request, Response} from "express";

interface Ranking {
    noah: number,
    christian: number,
    hadi: number,
    yasith: number,
    aaron: number,
    peter: number,
    [name: string]: number,
}

var submitted_rankings: Ranking[] = []

const rankHandler = (req: Request, res: Response) => {
    const ranking: Ranking = req.body
    submitted_rankings.push(ranking)

    if (submitted_rankings.length === 6) {
        let final_ranking: Ranking = {
            noah: 0,
            christian: 0,
            hadi: 0,
            yasith: 0,
            aaron: 0,
            peter: 0,
        }

        submitted_rankings.forEach(ranking => {
            for (const [name, rank] of Object.entries(ranking)) {
                final_ranking[name] += rank
            }
        })

        fs.writeFileSync('prisma/migrations/submissions.json', JSON.stringify(submitted_rankings, null, 4));

        // Create items array
        let items = Object.keys(final_ranking).map(key => {
            return {
                name: key,
                score: final_ranking[key]
            }
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second.score - first.score
        });

        fs.writeFileSync('.data/results.json', JSON.stringify(items, null, 4));

    }
    res.status(200).send({'status': 'Received'})
}

export { rankHandler }
