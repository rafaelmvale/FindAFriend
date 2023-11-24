import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', search)
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
