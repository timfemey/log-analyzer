import { parsedLines } from "../helpers/parseLines";


interface messagesAggr {
    count: number
    level: string
}

export function onEnd(data: parsedLines[]) {
    const levelCounts: { [key: string]: number } = {};
    const mostCommonMessageCount: { [key: string]: messagesAggr } = {}

    data.forEach(log => {
        levelCounts[log.level] = (levelCounts[log.level] || 0) + 1

        mostCommonMessageCount[log.message] = mostCommonMessageCount[log.message] == undefined ? { count: 1, level: log.level } : { count: mostCommonMessageCount[log.message].count + 1, level: log.level }
    })

    const entries = Object.entries(mostCommonMessageCount);

    entries.sort((a, b) => b[1].count - a[1].count);

    const top10 = entries.slice(0, 10);

    console.log("*RESULTS*:")
    console.log("Log Levels Occurence:")
    console.log(levelCounts)
    console.log("\n Top 10 Log Messages Received:")

    top10.map(([msg, value], i) => {
        console.log(`${i}. LEVEL: ${value.level} , COUNT:${value.count} , MESSAGE: ${msg} `)
    });
    console.log(`\n ${data.length} Lines Read`)

    console.timeEnd("Finished reading the file in")
}