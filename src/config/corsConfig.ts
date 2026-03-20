import cors from "cors";
// Load permitted origins from environment variables, separated by commas.
// This enables flexible control over which frontend applications can access
// our API without requiring code modifications—simply update the .env file.
const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(",") || [];

/**
 * CORS (Cross-Origin Resource Sharing) configuration.
 *
 * CORS manages which domains are permitted to send requests to this API
 * from a web browser. By default, browsers enforce the same-origin policy
 * and reject cross-origin requests unless explicitly allowed.
 */
export const corsConfig = cors({
    // Restrict requests to origins defined in environment variables.
    // This safeguards the API from unauthorized cross-origin access.
    origin: allowedOrigins,
    // Permit these HTTP verbs for standard CRUD operations.
    methods: ["GET", "POST", "PUT", "DELETE"],
    // Permit these headers in incoming requests.
    // Content-Type enables clients to transmit JSON payloads.
    // Authorization is reserved for future authentication mechanisms.
    allowedHeaders: ["Content-Type", "Authorization"],
    // Store the preflight response for 10 minutes (600 seconds).
    // Preflight refers to the OPTIONS request sent by browsers before actual requests
    // to verify CORS permissions. Caching decreases redundant server calls.
    maxAge: 600,
});
 