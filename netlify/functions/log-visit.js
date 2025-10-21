export async function handler(event, context) {
    const time = new Date().toISOString();
    const ip = event.headers['x-nf-client-connection-ip'] || 'unknown';
    const userAgent = event.headers['user-agent'] || 'unknown';

    console.log(`${time} | IP: ${ip} | Agent: ${userAgent}`);

    // Return a tiny transparent image
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
