'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
  fastify.register(require('fastify-swagger'), {
    swagger: {
      info: {
        title: 'Mail API',
        description: 'Mail documentation API',
        version: '0.1.0'
      },
      tags: [
        { name: 'Mail', description: 'Mail related end-points' },
      ],  
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      },
      security: [
        {
          "apiKey": []
        }
      ]
    },  
    exposeRoute: true,
    routePrefix: '/documentations'
  });
  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
