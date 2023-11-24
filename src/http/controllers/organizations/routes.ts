import { authenticate } from './authenticate'
import { register } from './register'
import { FastifyInstance } from 'fastify'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/sessions', authenticate)

  // Athenticate
  // app.get('/me', { onRequest: [verifyJWT] })
}
