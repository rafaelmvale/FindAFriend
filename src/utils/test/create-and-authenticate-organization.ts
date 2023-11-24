import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.organization.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'rua azul marinho',
      cep: '03456000',
      whatsapp: '11999991111',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
