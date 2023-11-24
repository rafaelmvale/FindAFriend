import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
    energy: z.string().optional(),
    independency: z.string().optional(),
    environment: z.string().optional(),
  })

  const { city, energy, independency, environment, page } =
    searchPetQuerySchema.parse(request.query)
  const searchPetsUseCase = makeSearchPetUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    page,
    energy,
    independency,
    environment,
  })
  return reply.status(200).send({
    pets,
  })
}
