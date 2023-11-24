import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import FastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(FastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(organizationsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation errors', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // aplicar logs para produção (Datadog e etc)
  }
  return reply.status(500).send({ messsage: 'Internal server error' })
})
