import { existsSync } from "node:fs";
import { normalize, extname } from "node:path/posix";


export function checkFilePath(filePath: string): "json" | "text" {
    const dir = normalize(filePath)

    if (existsSync(dir)) {
        const ext = extname(dir)
        if (ext == ".json") {
            return "json"
        }
        if (ext == ".txt") {
            return "text"
        }

        if (ext == ".log") {
            return "text"
        }
        throw new Error("Only JSON and TXT files are supported, Ensure Extension of file is .json, .log or .txt");

    }
    throw new Error("Invalid File Path, No File Found")
}