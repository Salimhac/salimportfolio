import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'visits.json');

export async function handler(event, context) {
    // Initialize file if it doesn't exist
    if (!fs.existsSync(logFile)) {
        fs.writeFileSync(logFile, JSON.stringify({ count: 0 }));
    }

    const data = JSON.parse(fs.readFileSync(logFile, 'utf8'));

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
}
