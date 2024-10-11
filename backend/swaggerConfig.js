const swaggerJsDoc = require('swagger-jsdoc');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') });


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ST II',
      version: '1.0.0',
      description: 'Documentation for the backend.',
      contact: {
        name: 'Atharva',
        email: 'atharvaghadi4@gmail.com'
      },
    },
    servers: [
      {
        url: process.env.PG_HOST,  // Update to your server URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional, can be just Bearer
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply globally or per route
      },
    ],
  },
  apis: ['./routes/*.js'], // Specify the paths to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
