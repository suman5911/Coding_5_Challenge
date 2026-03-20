import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Configuration object for swagger-jsdoc to construct the OpenAPI specification
const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Resource Library API",
            version: "1.0.0",
            description: "API for organizing and accessing educational resources within a learning platform.",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
                description: "Local development server",
            },
        ],
    },
    // Specify the locations where swagger-jsdoc should search for JSDoc annotations
    apis: ["./src/api/v1/routes/*.ts", "./src/app.ts"],
};

// Build the OpenAPI specification from JSDoc annotations
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};

// Initialize Swagger UI endpoint at /api-docs
const setupSwagger = (app: Express): void => {
    const specs = generateSwaggerSpec();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;