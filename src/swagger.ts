import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from "express"

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Farm Management API',
      version: '1.0.0',
      description: 'A simple API to manage farms, crops, addresses, and farmers',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes.ts', './src/**/*.ts'], // path to your route files
};

const swaggerSpec = swaggerJsDoc(options);

export function setupSwagger(app:Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
