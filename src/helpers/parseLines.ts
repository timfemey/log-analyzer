export interface parsedLines {
    timestamp: string, level: string, source: string, message: string
}

export default function parseLines(logs: string[]): parsedLines[] {
    const result: parsedLines[] = []
    for (let index = 0; index < logs.length; index++) {
        const log = logs[index];

        const regex = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (\w+) \[(\w+)\] (.+)$/gm;

        let match;
        while ((match = regex.exec(log)) !== null) {
            const timestamp = match[1];
            const level = match[2];
            const source = match[3];
            const message = match[4];

            result.push({ timestamp, level, source, message })
        }
    }

    return result
}