import analyzeText from "../helpers/analyzeText.js";
import { checkFilePath } from "../helpers/checkFilePath.js";
import { createReadStream } from "node:fs";
import { parsedLines } from "../helpers/parseLines.js";
import { createInterface } from "node:readline";
import { onEnd } from "./onEnd.js";

export function readFile(filePath: string) {
    console.time("Finished reading the file in")
    const type = checkFilePath(filePath)

    if (type != "text" && type != "json") {
        throw new Error("Invalid File Format Extension Received. Choose between json or text");
    }

    const readStream = createReadStream(filePath, { encoding: "utf-8" })

    const data: parsedLines[] = []


    if (type == "json") {


    }


    if (type == "text") {
        const rl = createInterface({ input: readStream, crlfDelay: Infinity })

        // On Error while Streaming File
        rl.on("error", (err) => {
            console.error("Error message: ", err)
            console.error("An Error Occured while reading file, Retrying Operation in 30 seconds. Press Ctrl+C to exit if you want to exit ")
            setTimeout(() => {
                readFile(filePath)
            }, 31000)

        })


        //on Data of Stream
        rl.on("line", (chunk) => {
            const res = analyzeText(chunk)
            data.push(...res)
        })

        //On Close or End of Stream
        rl.on('close', () => {
            onEnd(data)

        });
    }


}



