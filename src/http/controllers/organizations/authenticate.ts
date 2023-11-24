import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        // role: organization.role,
      },
      {
        sign: {
          sub: organization.id,
          expiresIn: '7d',
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
