export const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Exemplo Autenticação',
      version: '0.1.0',
      description: 'API para estudo de autenticação com JWT',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Sidney Sousa',
        url: 'https://github.com/sidneyroberto',
        email: 'sidney.sousa@ifms.edu.br',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['**/*.yaml'],
}