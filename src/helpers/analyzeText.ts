import parseLines from "./parseLines.js";

let strData: string = ''

export default function analyzeText(chunk: string | Buffer) {
    strData += chunk

    const lines = strData.split("\n")

    const analyzedLines = parseLines(lines)

    return analyzedLines

}