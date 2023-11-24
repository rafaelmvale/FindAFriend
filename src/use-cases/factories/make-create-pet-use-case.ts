import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const petsUseCase = new CreatePetUseCase(
    petsRepository,
    organizationsRepository,
  )

  return petsUseCase
}
