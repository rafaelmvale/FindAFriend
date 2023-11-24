import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { RegisterOrganizationUseCase } from '../register-organization'

export function makeRegisterOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const registerUseCase = new RegisterOrganizationUseCase(
    organizationsRepository,
  )
  return registerUseCase
}
