import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsUseCase } from '../search-pets'

export function makeSearchPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petsUseCase = new SearchPetsUseCase(petsRepository)

  return petsUseCase
}
