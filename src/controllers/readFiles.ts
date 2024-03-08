import analyzeText from "../helpers/analyzeText.js";
import { checkFilePath } from "../helpers/checkFilePath.js";
import { createReadStream } from "node:fs";
import { parsedLines } from "../helpers/parseLines.js";
import { createInterface } from "node:readline";
import JSONStream from "jsonstream-next";
import analyzeJSON from "../helpers/analyzeJSON.js";
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
        const jsonStream = readStream.pipe(JSONStream.parse("*"))

        //Incase of Error
        jsonStream.on('error', function (error) {
            console.error('Error reading JSON stream:', error);
        });

        //on Data of Stream
        jsonStream.on("data", (chunk) => {
            const res = analyzeJSON(chunk)
            data.push(res)
        })

        //On Streqam End or Close
        jsonStream.on("end", () => {
            onEnd(data)
        })
    }


    if (type == "text") {
        const rl = createInterface({ input: readStream, crlfDelay: Infinity })

        // On Error while Streaming File
        rl.on("error", (err) => {
            console.error("Error reading Text File Stream: ", err)
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



