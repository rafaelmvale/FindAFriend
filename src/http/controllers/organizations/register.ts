import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    cep: z.string(),
    address: z.string(),
    city: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
  })

  const { name, email, cep, address, city, whatsapp, password } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterOrganizationUseCase()

    await registerUseCase.execute({
      name,
      email,
      cep,
      address,
      city,
      whatsapp,
      password,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
