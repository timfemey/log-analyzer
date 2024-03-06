import analyzeText from "../helpers/analyzeText.js";
import { checkFilePath } from "../helpers/checkFilePath.js";
import { createReadStream } from "node:fs";
import { parsedLines } from "../helpers/parseLines.js";
import { createInterface } from "node:readline";

interface messagesAggr {
    count: number
    level: string
}

export function readFile(filePath: string) {
    console.time("Finished reading the file in")
    const type = checkFilePath(filePath)

    if (type != "text" && type != "json") {
        throw new Error("Invalid File Format Extension Received. Choose between json or text");
    }

    const readStream = createReadStream(filePath, { encoding: "utf-8" })
    const rl = createInterface({ input: readStream, crlfDelay: Infinity })
    const data: parsedLines[] = []

    rl.on("error", (err) => {
        console.error("Error message: ", err)
        console.error("An Error Occured while reading file, Retrying Operation in 30 seconds. Press Ctrl+C to exit if you want to exit ")
        setTimeout(() => {
            readFile(filePath)
        }, 31000)

    })


    if (type == "json") {
        rl.on("line", (chunk) => {

        })
    }
    if (type == "text") {
        rl.on("line", (chunk) => {
            const res = analyzeText(chunk)
            data.push(...res)
        })
    }

    rl.on('close', () => {

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

    });

}



