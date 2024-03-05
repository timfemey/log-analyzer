import analyzeText from "../helpers/analyzeText.js";
import { checkFilePath } from "../helpers/checkFilePath.js";
import { createReadStream } from "node:fs";
import { parsedLines } from "../helpers/parseLines.js";

export function readFile(filePath: string) {
    const type = checkFilePath(filePath)

    if (type != "text" && type != "json") {
        throw new Error("Invalid File Format Extension Received. Choose between json or text");
    }

    const readStream = createReadStream(filePath, { encoding: "utf-8" })
    const data: parsedLines[] = []

    readStream.on("error", (err) => {
        console.error("Error message: ", err)
        console.error("An Error Occured while reading file, Retrying Operation in 30 seconds. Press Ctrl+C to exit if you want to exit ")
        setTimeout(() => {
            readFile(filePath)
        }, 31000)

    })


    if (type == "json") {
        readStream.on("data", (chunk) => {

        })
    }
    if (type == "text") {
        readStream.on("data", (chunk) => {
            const res = analyzeText(chunk)
            data.push(...res)
        })
    }

    readStream.on('end', () => {
        const levelCounts: { [key: string]: number } = {};

        data.forEach(log => {
            levelCounts[log.level] = (levelCounts[log.level] || 0) + 1
        })
        console.log("*RESULTS*:")
        console.log(levelCounts)
        console.log('Finished reading the file.');
    });

}