import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    IndependencyLevel: z.string(),
    environment: z.string(),
    photo: z.string(),
    requirement: z.string(),
  })

  const {
    name,
    about,
    age,
    size,
    energyLevel,
    IndependencyLevel,
    environment,
    photo,
    requirement,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energyLevel,
    IndependencyLevel,
    environment,
    photo,
    requirement,
    organizationId: request.user.sub,
  })
  return reply.status(201).send()
}
