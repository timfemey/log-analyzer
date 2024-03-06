import { EOL } from "node:os";
import parseLines from "./parseLines.js";

export default function analyzeText(chunk: string | Buffer) {
    let strData: string = chunk.toString()

    const lines = strData.split(EOL)

    const analyzedLines = parseLines(lines)

    return analyzedLines

}