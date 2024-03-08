import { parsedLines } from "./parseLines.js"

interface JSONChunk {
    level: string
    timestamp: string
    message: string
    source: string
}

export default function (chunk: JSONChunk): parsedLines {
    return { level: chunk.level, message: chunk.message, source: chunk.source, timestamp: chunk.timestamp }

}