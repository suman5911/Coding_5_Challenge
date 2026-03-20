import helmet from "helmet";

/**
 * Helmet security middleware configuration for JSON API endpoints.
 *
 * Configures HTTP security headers to safeguard the API.
 * Since this is a JSON API rather than a server-rendered HTML application,
 * certain headers intended for HTML content are disabled or modified accordingly.
 */
export const helmetConfig = helmet({
    // Disable Content-Security-Policy as this API serves JSON, not HTML.
    // CSP is designed to mitigate XSS vulnerabilities in HTML pages with
    // external scripts, stylesheets, and media. Since our API returns only
    // JSON data, CSP provides no protective value and may cause compatibility issues.
    contentSecurityPolicy: false,

    // HSTS enforces HTTPS-only connections to the API across all browsers.
    // It is disabled during development for testing with standard HTTP.
    // Enable this in production to ensure encrypted communication.
    hsts: process.env.NODE_ENV === "production"
        ? {
              maxAge: 31536000,        // 1 year in seconds
              includeSubDomains: true, // Include all subdomains
              preload: true,           // Enable browser preload list inclusion
          }
        : false,

    // Prohibit embedding API responses in iframes across different origins.
    // Defends against clickjacking exploits. "deny" disallows all framing.
    frameguard: { action: "deny" },

    // Strip the X-Powered-By header that Express provides automatically.
    // Conceals the Node.js/Express technology stack from potential attackers.
    hidePoweredBy: true,

    // Disable content type guessing by browsers.
    // Ensures JSON responses are not misinterpreted due to type sniffing.
    noSniff: true,
});
