import { checkFilePath } from "../helpers/checkFilePath.js";
import { createReadStream } from "node:fs";

export function readFile(filePath: string) {
    const type = checkFilePath(filePath)
    const readStream = createReadStream(filePath)

    readStream.on("error", (err) => {
        console.error("Error message: ", err)
        console.error("An Error Occured while reading file, Retrying Operation. Press Ctrl+C to exit if you want to exit ")
        readFile(filePath)
    })

    if (type == "json") {
        readStream.on("data", (chunk) => {

        })
    }
    if (type == "text") {
        readStream.on("data", (chunk) => {

        })
    }

    throw new Error("Invalid File Format Extension Received. Choose between json or text");

}