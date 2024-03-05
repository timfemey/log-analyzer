export function bufferToString(data: string | Buffer) {
    if (Buffer.isBuffer(data)) {
        return data.toString('utf8'); // Convert buffer to string using utf8 encoding
    } else {
        return data; // Return as is if not a Buffer
    }
}