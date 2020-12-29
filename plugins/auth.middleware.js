'use strict'

const fp = require('fastify-plugin')
const Boom = require("@hapi/boom");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts, done) {
  fastify.decorate('authenticate', async function (request, reply) {
    try {
      if (request.headers.authorization) {
        if (request.headers.authorization !== process.env.API_KEY) {
          reply.code(403);
          throw Boom.forbidden('Wrong API Key!') 
        }
      } else {
        reply.code(403);
        throw Boom.forbidden('API Key not found!') 
      }
    } catch (error) {
      throw Boom.forbidden('API Key not found!') 
    }
  })
})
