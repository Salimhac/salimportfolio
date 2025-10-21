// netlify/functions/log-visit.js
import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'visits.json');

// Initialize file if it doesn't exist
if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, JSON.stringify({ count: 0 }));
}

export async function handler(event, context) {
    // Read current count
    let data = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    data.count += 1;

    // Save updated count
    fs.writeFileSync(logFile, JSON.stringify(data));

    // Return a tiny transparent image (so it can still act as a tracking pixel)
    const img = Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAn0B9Jro7psAAAAASUVORK5CYII=",
        "base64"
    );

    return {
        statusCode: 200,
        headers: { "Content-Type": "image/png" },
        body: img.toString('base64'),
        isBase64Encoded: true
    };
}

// Optional: expose the count as JSON if requested
export async function getCount() {
    let data = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    return { count: data.count };
}
