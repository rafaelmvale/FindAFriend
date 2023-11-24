import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateOrganizationUseCase } from '../authenticate-organization'

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticateUseCase = new AuthenticateOrganizationUseCase(
    organizationsRepository,
  )

  return authenticateUseCase
}
